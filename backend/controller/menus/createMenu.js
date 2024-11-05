const Menu = require('../../models/menusModel');

// ดึงเมนูตาม role
const getMenuByRole = async (req, res) => {
  const { role } = req.user; // ดึง role จาก JWT หรือ session ที่ผู้ใช้ล็อกอิน

  try {
    // ค้นหาเมนูที่มี role ตรงกับผู้ใช้
    const menus = await Menu.find({ roles: role });

    res.status(200).json({ menus });
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงเมนู' });
  }
};

module.exports = { getMenuByRole };