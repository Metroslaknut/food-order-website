const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        message: "กรุณาเข้าสู่ระบบก่อนใช้งาน",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("ข้อผิดพลาดในการตรวจสอบโทเค็น:", err);
        return res.status(401).json({
          message: "โทเค็นไม่ถูกต้องหรือหมดอายุ",
          error: true,
          success: false,
        });
      }

      console.log("decoded", decoded);

      req.userId = decoded?._id;

      next();
    });
  } catch (err) {
    console.error("ข้อผิดพลาดใน authToken middleware:", err);
    res.status(500).json({
      message: err.message || "ข้อผิดพลาดของเซิร์ฟเวอร์ภายใน",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;