const createStorePermission = require("../../helpers/createStorePermission");
const storeModel = require("../../models/storeModel");

async function CreateStore(req, res) {
  try {
    const sessionUserId = req.userId; // รับ userId จาก session หรือ middleware ที่ตรวจสอบ JWT

    // ตรวจสอบสิทธิ์การสร้างร้านค้า
    if (!createStorePermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // ตรวจสอบว่า account_name ถูกส่งมาพร้อมกับ request หรือไม่
    const { account_name, ...storeData } = req.body;
    if (!account_name) {
      throw new Error("Account name is required");
    }

    // สร้างร้านค้าใหม่และบันทึก userId + account_name
    const createStore = new storeModel({
      ...storeData,
      userId: sessionUserId,
      account_name,
    });

    const saveStore = await createStore.save();

    // ส่ง response กลับเมื่อสร้างสำเร็จ
    res.status(201).json({
      message: "Create store successfully",
      error: false,
      success: true,
      data: saveStore,
    });
  } catch (error) {
    console.error("Error in CreateStore:", error); // Log เพื่อตรวจสอบ
    res.status(400).json({
      message: error.message || "An unexpected error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = CreateStore;