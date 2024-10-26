import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SummaryApi from "../../common";

const UpdateStore = ({ onClose, store, callFunc }) => {
  const [data, setData] = useState({
    storeName: "",
    description: "",
    categoryStore: "",
    branchType: "",
    openingTime: "",
    closingTime: "",
    holidays: "",
    address: "",
    phone: "",
    email: "",
    paymentMethods: [],
    line: "",
    facebook: "",
    instagram: "",
  });

  // กำหนดค่าเริ่มต้นของฟอร์มด้วยข้อมูลร้านที่ได้รับ
  useEffect(() => {
    if (store) {
      setData(store);
    }
  }, [store]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e, method) => {
    setData((prev) => {
      const paymentMethods = prev.paymentMethods || [];
      if (e.target.checked && !paymentMethods.includes(method)) {
        return { ...prev, paymentMethods: [...paymentMethods, method] };
      } else {
        return {
          ...prev,
          paymentMethods: paymentMethods.filter((m) => m !== method),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${SummaryApi.updateStore.url}/${store._id}`,
        {
          method: "PUT", // หรือ SummaryApi.updateStore.method
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      const responseData = await response.json();
  
      if (response.ok) {
        // การอัปเดตสำเร็จ
        toast.success(responseData.message);
      } else {
        // การอัปเดตไม่สำเร็จ
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error updating store:", error);
      toast.error("Failed to update the store.");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">แก้ไขร้านค้า</h2>
          <IoMdClose
            className="text-3xl cursor-pointer text-gray-600 hover:text-red-500"
            onClick={onClose}
          />
        </div>

        <form
          className="grid p-4 gap-3 overflow-y-auto"
          style={{ maxHeight: "60vh" }} // กำหนดความสูงสูงสุดและให้เลื่อนอัตโนมัติ
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="storeName"
              className="block font-medium text-gray-700"
            >
              ชื่อร้านค้า (Store Name)
            </label>
            <input
              type="text"
              name="storeName"
              value={data.storeName}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              คำอธิบายร้าน (Description)
            </label>
            <textarea
              type="text"
              name="description"
              value={data.description}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="categoryStore"
                className="block font-medium text-gray-700"
              >
                ประเภทของร้านค้า (Category)
              </label>
              <select
                name="categoryStore"
                value={data.categoryStore}
                onChange={handleOnChange}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              >
                <option value="ร้านอาหาร">ร้านอาหาร</option>
                <option value="ร้านเครื่องดื่ม">ร้านเครื่องดื่ม</option>
                <option value="ร้านขายของชำ">ร้านขายของชำ</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="branchType"
                className="block font-medium text-gray-700"
              >
                สาขา (Branch)
              </label>
              <select
                name="branchType"
                value={data.branchType}
                onChange={handleOnChange}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              >
                <option value="สาขาหลัก">สาขาหลัก</option>
                <option value="สาขาย่อย">สาขาย่อย</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="openingTime"
                className="block font-medium text-gray-700"
              >
                เวลาเปิด (Open Time)
              </label>
              <input
                type="time"
                name="openingTime"
                value={data.openingTime || ""}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="closingTime"
                className="block font-medium text-gray-700"
              >
                เวลาปิด (Close Time)
              </label>
              <input
                type="time"
                name="closingTime"
                value={data.closingTime || ""}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="holidays"
              className="block font-medium text-gray-700"
            >
              วันหยุดประจำ (Weekly Holidays)
            </label>
            <select
              name="holidays"
              value={data.holidays || ""}
              onChange={handleOnChange}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
            >
              <option value="วันอาทิตย์">วันอาทิตย์</option>
              <option value="วันจันทร์">วันจันทร์</option>
              <option value="วันอังคาร">วันอังคาร</option>
              <option value="วันพุธ">วันพุธ</option>
              <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
              <option value="วันศุกร์">วันศุกร์</option>
              <option value="วันเสาร์">วันเสาร์</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block font-medium text-gray-700"
            >
              ที่อยู่ (Address)
            </label>
            <textarea
              type="text"
              name="address"
              value={data.address}
              onChange={handleOnChange}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              required // บังคับให้เลือก
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              เบอร์โทรศัพท์ (Phone Number)
            </label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleOnChange}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              required // บังคับให้เลือก
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              อีเมล (Email)
            </label>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              required // บังคับให้เลือก
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              วิธีการชำระเงินที่รองรับ (Payment Methods)
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Cash", "Credit Card", "PromptPay", "Bank Transfer"].map(
                (method) => (
                  <label key={method} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={method}
                      checked={data.paymentMethods.includes(method)}
                      onChange={(e) => handlePaymentChange(e, method)}
                    />
                    {method}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label htmlFor="line" className="block font-medium text-gray-700">
              เว็บไซต์ / เพจ (Website / Social Media Links)
            </label>
            <div>
              <input
                type="text"
                name="line"
                value={data.line}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              />
              <input
                type="text"
                name="facebook"
                value={data.facebook}
                onChange={handleOnChange}
                className="w-full mt-3 p-3 bg-slate-100 border rounded-md"
              />
              <input
                type="text"
                name="instagram"
                value={data.instagram}
                onChange={handleOnChange}
                className="w-full mt-3 p-3 bg-slate-100 border rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-3 py-2 bg-red-600 text-white mt-5 hover:bg-red-700"
          >
            Update Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStore;
