import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiSolidEdit } from "react-icons/bi";
import moment from "moment";
import SummaryApi from "../common";
import CreateCategory from "../components/category/CreateCategory";
import { toast } from "react-toastify";

const Category = () => {
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [allCategory, setAllCategory] = useState([]); // เก็บข้อมูลหมวดหมู่

  const user = useSelector((state) => state?.user?.user); // ดึงข้อมูล user ที่ล็อกอิน

  // ฟังก์ชันสำหรับดึงข้อมูลหมวดหมู่
  const fetchAllCategory = async () => {
    try {
      const response = await fetch(SummaryApi.getCategory.url, {
        method: SummaryApi.getCategory.method,
        credentials: "include",
      });

      const data = await response.json(); // แปลงเป็น JSON
      console.log("API Response:", data); // Debug: ตรวจสอบข้อมูลที่ได้จาก API

      if (response.ok && !data.error) {
        setAllCategory(data.categories); // เก็บข้อมูลหมวดหมู่ใน state (ปรับตามชื่อฟิลด์จาก API)
      } else {
        toast.error(data.message || "Failed to load categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    }
  };

  // ดึงข้อมูลหมวดหมู่เมื่อ component โหลด
  useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Category</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenCreateCategory(true)}
        >
          + Create
        </button>
      </div>

      {/* ตารางหมวดหมู่ */}
      <div className="flex-1 overflow-y-auto gap-5 py-2 mt-4">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>ลำดับ</th>
              <th>ชื่อหมวดหมู่</th>
              <th>วันที่ลงทะเบียน</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCategory.length > 0 ? (
              allCategory.map((el, index) => (
                <tr key={el._id}>
                  <td>{index + 1}</td>
                  <td>{el?.categoryName}</td>
                  <td>{moment(el?.createdAt).format("DD/MM/YYYY")}</td>
                  <td>
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                      onClick={() => console.log("Edit category:", el)}
                    >
                      <BiSolidEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  ไม่มีข้อมูลหมวดหมู่
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal สำหรับสร้างหมวดหมู่ */}
      {openCreateCategory && (
        <CreateCategory onClose={() => setOpenCreateCategory(false)} />
      )}
    </div>
  );
};

export default Category;
