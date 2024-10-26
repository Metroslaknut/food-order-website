import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux"; // นำเข้า useSelector
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const CreateStore = ({ onClose, fetchData }) => {
  const user = useSelector((state) => state.user.user); // ดึงข้อมูล user ที่ล็อกอิน

  const [data, setData] = useState({
    userID: user?.userID || "", // ใช้ userID ที่ดึงมา
    account_name: user?.account_name || "", // ใช้ account_name ที่ดึงมา
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

    const payload = {
      ...data,
    };

    try {
      const response = await fetch(SummaryApi.createStore.url, {
        method: SummaryApi.createStore.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        if (typeof fetchData === "function") fetchData();
      } else if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">เพิ่มร้านค้า</h2>
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
              id="storeName"
              placeholder="Enter store name"
              name="storeName"
              value={data.storeName}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              required // บังคับให้เลือก
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
              id="description"
              placeholder="Enter description"
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
                id="categoryStore"
                name="categoryStore"
                value={data.categoryStore}
                onChange={handleOnChange}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
                required // บังคับให้เลือก
              >
                <option value="">เลือกประเภทของร้านค้า</option>
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
                id="branchType"
                name="branchType"
                value={data.branchType}
                onChange={handleOnChange}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
                required // บังคับให้เลือก
              >
                <option value="" disabled>
                  เลือกประเภทสาขา
                </option>
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
                id="openingTime"
                name="openingTime"
                value={data.openingTime || ""}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
                placeholder="Enter opening time"
                required // บังคับให้เลือก
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
                id="closingTime"
                name="closingTime"
                value={data.closingTime || ""}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
                placeholder="Enter opening time"
                required // บังคับให้เลือก
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
              id="holidays"
              name="holidays"
              value={data.holidays || ""}
              onChange={handleOnChange}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
            >
              <option value="">เลือกวันหยุด</option>
              <option value="วันอาทิตย์">วันอาทิตย์</option>
              <option value="วันจันทร์">วันจันทร์</option>
              <option value="วันอังคาร">วันอังคาร</option>
              <option value="วันพุธ">วันพุธ</option>
              <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
              <option value="วันศุกร์">วันศุกร์</option>
              <option value="วันเสาร์">วันเสาร์</option>
            </select>
          </div>

          <label htmlFor="address" className="block font-medium text-gray-700">
            ที่อยู่ (Address)
          </label>
          <textarea
            type="text"
            id="address"
            placeholder="Enter address"
            name="address"
            value={data.address}
            onChange={handleOnChange}
            className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
            required // บังคับให้เลือก
          />

          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              เบอร์โทรศัพท์ (Phone Number)
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
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
              id="email"
              placeholder="Enter email "
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
                id="line"
                placeholder="Enter line ID"
                name="line"
                value={data.line}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              />
              <input
                type="text"
                id="facebook"
                placeholder="Enter facebook link"
                name="facebook"
                value={data.facebook}
                onChange={handleOnChange}
                className="w-full mt-3 p-3 bg-slate-100 border rounded-md"
              />
              <input
                type="text"
                id="instagram"
                placeholder="Enter instagram link"
                name="instagram"
                value={data.instagram}
                onChange={handleOnChange}
                className="w-full mt-3 p-3 bg-slate-100 border rounded-md"
              />
            </div>
          </div>

          <button className="px-3 py-2 bg-red-600 text-white mt-5 hover:bg-red-700">
            Create Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
