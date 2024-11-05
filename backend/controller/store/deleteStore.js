// controller/store/deleteStore.js
const Store = require("../../models/storeModel"); // นำเข้าโมเดล Store

const deleteStore = async (req, res) => {
  const { id } = req.params; // ดึง store ID จาก request parameter

  try {
    // ลบ store โดยใช้ store ID
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบร้านค้าที่ต้องการลบ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ลบร้านค้าเรียบร้อยแล้ว",
    });
  } catch (error) {
    console.error("Error deleting store:", error);
    return res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในการลบร้านค้า",
    });
  }
};

module.exports = { deleteStore };