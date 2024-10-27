import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ViewCategory = ({ onClose, category}) => {
  const [data, setData] = useState({
    storeName: "",
    categoryName: "",
  });

  // กำหนดค่าเริ่มต้นของฟอร์มด้วยข้อมูลร้านที่ได้รับ
  useEffect(() => {
    if (category) {
      setData(category);
    }
  }, [category]);

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            รายละเอียดประเภทสินค้า
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
              htmlFor="Category"
              className="block font-medium text-gray-700"
            >
              ประเภทสินค้า (Category name)
            </label>
            <input
              type="text"
              value={data.categoryName}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              readOnly
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default ViewCategory;
