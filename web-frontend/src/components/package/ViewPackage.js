import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ViewPackage = ({ onClose, packageData }) => {
  const [data, setData] = useState({
    packageName: "",
    countBranch: "",
    countEmployee: "",
    ePayment: "",
    reportSale: "",
    manageEmployee: "",
    eMenu: "",
    manageStore: "",
    delivery: "",
    platformOnline: "",
    teamsSupport: [],
    price: "",
  });

  // เริ่มต้นข้อมูลฟอร์มด้วยข้อมูลของร้านค้า
  useEffect(() => {
    if (packageData) setData(packageData);
  }, [packageData]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose} // ปิดโมดัลเมื่อคลิกที่พื้นหลัง
    >
      <div
        className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative overflow-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้คลิกปิดโมดัลเมื่อคลิกภายในโมดัล
      >
        {/* หัวข้อ */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">รายละเอียดร้านค้า</h2>
          <IoMdClose
            className="text-3xl cursor-pointer text-gray-600 hover:text-red-500"
            onClick={onClose} // ปิดโมดัลเมื่อคลิกที่ไอคอน
          />
        </div>

        {/* เนื้อหา */}
        <div className="grid gap-6 mt-6">
          {/* ข้อมูลร้านค้า */}
          <div>
            <label className="block font-medium text-gray-700">Package</label>
            <input
              type="text"
              value={data.packageName}
              className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
              disabled
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">จำนวนสาขา</label>
            <textarea
              value={data.countBranch}
              className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">จำนวนพนักงาน</label>
              <input
                type="text"
                value={data.countEmployee}
                className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
                disabled
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">ePayment</label>
              <input
                type="text"
                value={data.ePayment}
                className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">รายงานยอดขาย</label>
            <input
              type="text"
              value={data.reportSale}
              className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
              disabled
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">จัดการพนักงาน</label>
            <input
              type="text"
              value={data.manageEmployee}
              className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
              disabled
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">รูปเมนู</label>
          <input
            type="text"
            value={data.eMenu}
            className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">จัดการสต๊อกสินค้า</label>
          <input
            type="text"
            value={data.manageStore}
            className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">delivery</label>
          <input
            type="text"
            value={data.delivery}
            className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">รองรับการขายผ่านทางออนไลน์</label>
          <input
            type="text"
            value={data.platformOnline}
            className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">ราคา Package</label>
          <input
            type="text"
            value={data.price}
            className="w-full mt-1 p-3 bg-gray-100 border rounded-md"
            disabled
          />
        </div>

        {/* บริการ Support */}
        <div>
          <label className="block font-medium text-gray-700">TeamsSupport</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {["เงินสด", "บัตรเครดิต", "PromptPay", "โอนเงินผ่านธนาคาร"].map(
              (method) => (
                <div key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.teamsSupport.includes(method)}
                    disabled
                  />
                  <span>{method}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPackage;
