import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateCategory = ({ onClose, fetchData }) => {
  const [stores, setStores] = useState([]); // ร้านค้าที่จะกรองตาม userId
  const [userStore, setUserStore] = useState(""); // _id ของร้านที่ผู้ใช้เลือก
  const [selectedStoreName, setSelectedStoreName] = useState(""); // ชื่อร้านที่ผู้ใช้เลือก
  const [data, setData] = useState({
    categoryName: "", // ชื่อประเภทสินค้า
    userID: "", // ID ของผู้ใช้
  });

  const user = useSelector((state) => state?.user?.user); // ดึงข้อมูล user จาก Redux

  // ฟังก์ชันดึงข้อมูลร้านค้า
  const fetchGetStore = async () => {
    try {
      const response = await fetch(SummaryApi.getStores.url, {
        method: SummaryApi.getStores.method,
        credentials: "include",
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok && !result.error) {
        const userStores = result.stores.filter(
          (store) => store.userId.toString() === user._id.toString()
        );
        setStores(userStores); // เก็บร้านค้าที่ผู้ใช้เป็นเจ้าของ
      } else {
        toast.error(result.message || "Failed to load stores.");
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      toast.error("Error fetching stores.");
    }
  };

  // ดึงข้อมูลร้านค้าเมื่อผู้ใช้ล็อกอินสำเร็จ
  useEffect(() => {
    if (user && user._id) {
      fetchGetStore(); // ดึงข้อมูลร้านค้า
      setData((prev) => ({ ...prev, userID: user._id })); // ตั้งค่า userID
    }
  }, [user]);

  // เมื่อผู้ใช้เลือก Store
  const handleStoreChange = (e) => {
    const selectedStoreId = e.target.value;
    setUserStore(selectedStoreId); // เก็บ _id ของร้านที่เลือก

    // หา storeName จาก store ที่เลือก
    const store = stores.find((s) => s._id === selectedStoreId);
    if (store) {
      setSelectedStoreName(store.storeName); // ตั้งค่า storeName
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...data, storeID: userStore, storeName: selectedStoreName };

    try {
      const response = await fetch(SummaryApi.createCategory.url, {
        method: SummaryApi.createCategory.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose(); // ปิด modal
        if (typeof fetchData === "function") fetchData(); // โหลดข้อมูลใหม่
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Error connecting to the server.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            เพิ่มประเภทสินค้า
          </h2>
          <IoMdClose
            className="text-3xl cursor-pointer text-gray-600 hover:text-red-500"
            onClick={onClose}
          />
        </div>

        <form
          className="grid p-4 gap-3 overflow-y-auto"
          style={{ maxHeight: "60vh" }}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="storeName" className="block font-medium text-gray-700">
              เลือกร้านค้า (Select Store)
            </label>
            <select
              className="p-2 bg-slate-100 border rounded w-full"
              value={userStore}
              onChange={handleStoreChange}
              required
            >
              <option value="">-- เลือกร้านค้า --</option>
              {stores.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="categoryName"
              className="block font-medium text-gray-700"
            >
              ประเภทสินค้า (Category Name)
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              name="categoryName"
              value={data.categoryName}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              required
            />
          </div>

          <button className="px-3 py-2 bg-red-600 text-white mt-5 hover:bg-red-700">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;