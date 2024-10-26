const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
  try {
    // Destructure ข้อมูลจาก req.body
    const { account_name, phone, email, password } = req.body;

    // ตรวจสอบว่ามีฟิลด์ที่จำเป็นหรือไม่
    if (!account_name || !phone || !email || !password) {
      return res.status(400).json({
        message: "All fields (account_name, phone, email, password) are required",
        error: true,
        success: false,
      });
    }

    // สร้าง payload และบันทึกข้อมูลผู้ใช้ โดยกำหนด role เป็น "GENERAL"
    const userData = new userModel({
      account_name,
      phone,
      email,
      password,
      role: "GUEST", // กำหนดค่า role เป็น "GENERAL"
    });

    const saveUser = await userData.save();

    // ตอบกลับสถานะสำเร็จ
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (error) {
    // ตอบกลับเมื่อมีข้อผิดพลาด
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
