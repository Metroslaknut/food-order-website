const packageModel = require("../../models/packageModel");


async function getPackage(req, res) {
  try {
    const package = await packageModel.find();

    res.status(200).json({
      message: "Stores fetched successfully",
      package, // ส่งข้อมูล package โดยตรง
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

module.exports = getPackage;
