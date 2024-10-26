const categoryModel = require("../../models/categoryModel");

async function getCategoryController(req, res) {
  try {
    const categories = await categoryModel.find();

    res.status(200).json({
      message: "Categories fetched successfully",
      categories,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching categories:", error); // Log เพื่อดูข้อผิดพลาด
    res.status(400).json({
      message: error.message || "Failed to fetch categories",
      error: true,
      success: false,
    });
  }
}

module.exports = getCategoryController;

