const createPackagePermission = require("../../helpers/createPackagePermission");
const packageModel = require("../../models/packageModel");

async function CreatePackage(req, res) {
  try {
    const sessionUserId = req.userId; // รับ userId จาก session หรือ middleware ที่ตรวจสอบ JWT

    // ตรวจสอบสิทธิ์การสร้างร้านค้า
    if (!createPackagePermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const createPackage = new packageModel(req.body)
    const savePackage = await createPackage.save()

    // ส่ง response กลับเมื่อสร้างสำเร็จ
    res.status(201).json({
      message: "Create package successfully",
      error: false,
      success: true,
      data: savePackage,
    });
  } catch (error) {
    console.error("Error in CreatePackage:", error); // Log เพื่อตรวจสอบ
    res.status(400).json({
      message: error.message || "An unexpected error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = CreatePackage;