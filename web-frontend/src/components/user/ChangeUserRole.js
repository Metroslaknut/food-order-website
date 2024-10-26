import React, { useState, useEffect } from "react";
import ROLE from "../../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({
  userId,
  account_name,
  phone,
  email,
  role,
  onClose,
  callFunc,
}) => {
  const [stores, setStores] = useState([]); // เก็บข้อมูลร้านค้า
  const [userStore, setUserStore] = useState(""); // เก็บ storeId ที่เลือก
  const [userRole, setUserRole] = useState(role); // เก็บ role ที่เลือก

  // Fetch stores เมื่อ component โหลด
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

  const handleStoreChange = (e) => {
    setUserStore(e.target.value); // เก็บ storeId ที่เลือก
    console.log("Selected Store ID:", e.target.value);
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value); // เก็บ role ที่เลือก
    console.log("Selected Role:", e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const response = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId, storeId: userStore, role: userRole }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message);
      }

      console.log("Role updated", responseData);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Change User</h2>
          <div
            className="text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-3 overflow-y-auto"
          style={{ maxHeight: "60vh" }} // กำหนดความสูงสูงสุดและให้เลื่อนอัตโนมัติ
        >
          <label htmlFor="storeName" className="mt-3">
            ชื่อผู้ใช้ (Username)
          </label>
          <input
            type="text"
            id="storeName"
            placeholder="Enter store name"
            name="storeName"
            value={account_name}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="storeName" className="mt-3">
            เบอร์โทร (Phone Number)
          </label>
          <input
            type="text"
            id="storeName"
            placeholder="Enter store name"
            name="storeName"
            value={phone}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="storeName" className="mt-3">
            อีเมล์ (Email Address)
          </label>
          <input
            type="text"
            id="storeName"
            placeholder="Enter store name"
            name="storeName"
            value={email}
            className="p-2 bg-slate-100 border rounded"
          />

          <div className="flex flex-col mt-4">
            <label htmlFor="storeName" className="mt-3">
              เลือกร้านค้า (Select Store)
            </label>
            <select
              className="p-2 bg-slate-100 border rounded w-full"
              value={userStore} // storeId ที่เลือก
              onChange={handleStoreChange}
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.storeName} {/* แสดงชื่อร้าน */}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="userRole" className="mt-3">
              เลือกสิทธิ์ (Select Role)
            </label>
            <select
              className="p-2 bg-slate-100 border rounded w-full"
              value={userRole} // role ที่เลือก
              onChange={handleRoleChange}
            >
              {Object.values(ROLE).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button
            className="px-3 py-2 bg-red-600 text-white mt-5 hover:bg-red-700"
            onClick={updateUserRole}
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserRole;
