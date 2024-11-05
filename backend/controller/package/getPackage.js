const packageModel = require("../../models/packageModel");


async function getPackageController(req, res) {
  try {
    const packages = await packageModel.find();

    res.status(200).json({
      message: "Package fetched successfully",
      packages,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(400).json({
      message: error.message || "Failed to fetch package",
      error: true,
      success: false,
    });
  }
}

module.exports = getPackageController;
