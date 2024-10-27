import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiSolidEdit } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import SummaryApi from "../common";
import CreateCategory from "../components/category/CreateCategory";
import { toast } from "react-toastify";
import ViewCategory from "../components/category/ViewCategory";
import UpdateCategory from "../components/category/UpdateCategory";

const Category = () => {
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [openViewCategory, setOpenViewCategory] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [updateUserDetails, setUpdateUserDetails] = useState({});
  const [ViewCategoryDetails, setViewCategoryDetails] = useState({});
  const [filterStore, setFilterStore] = useState(""); // เก็บค่าชื่อร้านที่กรอง

  const user = useSelector((state) => state?.user?.user); // ดึงข้อมูล user ที่ล็อกอิน

  const fetchAllCategory = async () => {
    try {
      const response = await fetch(SummaryApi.getCategory.url, {
        method: SummaryApi.getCategory.method,
        credentials: "include",
      });

      const data = await response.json();
      console.log("API Response:", data); 

      if (response.ok && !data.error) {
        const userCategories = data.categories.filter(
          (category) => category.userID === user._id
        );
        setAllCategory(userCategories);
      } else {
        toast.error(data.message || "Failed to load categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories.");
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  // ฟังก์ชันกรองข้อมูลหมวดหมู่ตามร้านค้า
  const filteredCategories = allCategory.filter((category) =>
    category.storeName.toLowerCase().includes(filterStore.toLowerCase())
  );

  const handleViewCategory = (category) => {
    setViewCategoryDetails(category);
    setOpenViewCategory(true);
  };

  const handleEditCategory = (category) => {
    setUpdateUserDetails(category);
    setOpenUpdateCategory(true);
  };

  const handleDeleteCategory = () => {
    toast.info("Delete functionality not implemented yet.");
  };

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

      {/* Filter ร้านค้า */}
      <div className="p-4">
        <input
          type="text"
          placeholder="ค้นหาตามชื่อร้าน"
          value={filterStore}
          onChange={(e) => setFilterStore(e.target.value)}
          className="border px-3 py-2 rounded-md w-full"
        />
      </div>

      {/* ตารางหมวดหมู่ */}
      <div className="flex-1 overflow-y-auto gap-5 py-2">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>ลำดับ</th>
              <th>ร้านค้า</th>
              <th>ประเภทสินค้า</th>
              <th>วันที่ลงทะเบียน</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category?.storeName}</td>
                  <td>{category?.categoryName}</td>
                  <td>{moment(category.createdAt).format("DD/MM/YYYY")}</td>
                  <td className="text-center w-24">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                        onClick={() => handleViewCategory(category)}
                      >
                        <HiOutlineDocumentReport />
                      </button>
                      <button
                        className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                        onClick={() => handleEditCategory(category)}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                        onClick={handleDeleteCategory}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  ไม่มีข้อมูลหมวดหมู่
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openCreateCategory && (
        <CreateCategory onClose={() => setOpenCreateCategory(false)} />
      )}

      {openViewCategory && (
        <ViewCategory
          onClose={() => setOpenViewCategory(false)}
          category={ViewCategoryDetails}
          callFunc={fetchAllCategory}
        />
      )}

      {openUpdateCategory && (
        <UpdateCategory
          onClose={() => setOpenUpdateCategory(false)}
          category={updateUserDetails}
          callFunc={fetchAllCategory}
        />
      )}
    </div>
  );
};

export default Category;