const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    const userId = req.userId;

    // ตรวจสอบว่า userId มีอยู่หรือไม่
    if (!userId) {
      return res.status(400).json({
        message: "ต้องการ User ID",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findById(userId);

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return res.status(404).json({
        message: "ไม่พบผู้ใช้",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "ดึงข้อมูลผู้ใช้สำเร็จ",
    });

    console.log("user", user);
  } catch (err) {
    console.error("ข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", err); // การบันทึกข้อผิดพลาดที่ดีขึ้น
    res.status(500).json({
      message: err.message || "ข้อผิดพลาดของเซิร์ฟเวอร์ภายใน",
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
