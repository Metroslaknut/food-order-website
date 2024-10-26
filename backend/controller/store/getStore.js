const storeModel = require("../../models/storeModel");

async function getStoreController(req, res) {
  try {
    const stores = await storeModel.find();

    res.status(200).json({
      message: "Stores fetched successfully",
      stores, // ส่งข้อมูล stores โดยตรง
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching stores:", error); // Log เพื่อดูข้อผิดพลาด
    res.status(400).json({
      message: error.message || "Failed to fetch stores",
      error: true,
      success: false,
    });
  }
}

module.exports = getStoreController;
