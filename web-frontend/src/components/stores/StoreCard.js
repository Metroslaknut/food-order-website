import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ViewStore = ({ onClose, store}) => {
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

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            รายละเอียดร้านค้า
          </h2>
          <IoMdClose
            className="text-3xl cursor-pointer text-gray-600 hover:text-red-500"
            onClick={onClose}
          />
        </div>

        <form
          className="grid p-4 gap-3 overflow-y-auto"
          style={{ maxHeight: "60vh" }} // กำหนดความสูงสูงสุดและให้เลื่อนอัตโนมัติ
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
              value={data.storeName}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              readOnly
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
              value={data.description}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              readOnly
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
              <input
                type="text"
                value={data.categoryStore}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="branchType"
                className="block font-medium text-gray-700"
              >
                สาขา (Branch)
              </label>
              <input
                type="text"
                value={data.branchType}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
                readOnly
              />
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
                value={data.openingTime || ""}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
                readOnly
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
                value={data.closingTime || ""}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
                readOnly
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
            <input
              type="text"
              value={data.holidays}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block font-medium text-gray-700"
            >
              ที่อยู่ (Address)
            </label>
            <textarea
              value={data.address}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium text-gray-700">
              เบอร์โทรศัพท์ (Phone Number)
            </label>
            <input
              type="text"
              value={data.phone}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              อีเมล (Email)
            </label>
            <input
              type="email"
              value={data.email}
              className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
              readOnly
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
                      disabled // ปิดการแก้ไข
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
                value={data.line}
                className="w-full mt-1 p-3 bg-slate-100 border rounded-md"
                readOnly
              />
              <input
                type="text"
                value={data.facebook}
                className="w-full mt-3 p-3 bg-slate-100 border rounded-md"
                readOnly
              />
              <input
                type="text"
                value={data.instagram}
                className="w-full mt-3 p-3 bg-slate-100 border rounded-md"
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewStore;
