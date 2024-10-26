import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateCategory = ({ onClose, fetchData }) => {
  const user = useSelector((state) => state.user.user);

  const [stores, setStores] = useState([]);
  const [userStore, setUserStore] = useState("");
  const [data, setData] = useState({
    userID: user?.userID || "",
    account_name: user?.account_name || "",
    categoryName: "",
  });

  // ดึงข้อมูลร้านค้าเมื่อ component ถูกสร้างขึ้น
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(SummaryApi.getStores.url, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        console.log("Fetched data:", data); // ตรวจสอบข้อมูลที่ได้รับ

        if (response.ok && data.success) {
          setStores(data.stores); // เก็บร้านค้าใน state
          setUserStore(data.stores[0]?.id || ""); // ตั้งค่าเริ่มต้นเป็น store แรก
        } else {
          toast.error(data.message || "Failed to load stores");
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
        toast.error("Error fetching stores");
      }
    };

    fetchStores();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreChange = (e) => setUserStore(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...data, storeID: userStore };

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
        onClose();
        if (typeof fetchData === "function") fetchData();
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
          <div className="flex flex-col mt-4">
            <label htmlFor="store" className="mt-3">
              เลือกร้านค้า (Select Store)
            </label>
            <select
              className="p-2 bg-slate-100 border rounded w-full"
              value={userStore}
              onChange={handleStoreChange}
              required
            >
              <option value="">-- Select Store --</option>
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
