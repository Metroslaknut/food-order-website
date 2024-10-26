import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux"; // นำเข้า useSelector
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const CreatePackage = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    packageName: "",
    countBranch: "",
    countEmployee: "",
    // ePayment: "",
    // reportSale: "",
    // manageEmployee: "",
    // eMenu: "",
    // manageStore: "",
    // delivery: {
    //   grab: false, // สำหรับ Grab
    //   lineman: false, // สำหรับ Lineman
    // },
    // platformOnline: "",
    // teamsSupport: [], // ต้องมีการกำหนดให้ชัดเจน
    price: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...data,
    };

    try {
      const response = await fetch(SummaryApi.createPackage.url, {
        method: SummaryApi.createPackage.method,
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
          <h2 className="text-2xl font-semibold text-gray-800">เพิ่มแพ็คเกจ</h2>
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
              htmlFor="packageName"
              className="block font-medium text-gray-700"
            >
              แพ็คเกจ (Package)
            </label>
            <input
              type="text"
              id="packageName"
              placeholder="Enter package name"
              name="packageName"
              value={data.packageName}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              required // บังคับให้เลือก
            />
          </div>

          <div>
            <label
              htmlFor="countBranch"
              className="block font-medium text-gray-700"
            >
              จำนวนสาขา (Branch)
            </label>
            <input
              type="number"
              id="countBranch"
              placeholder="Enter branch name"
              name="countBranch"
              value={data.countBranch}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              required // บังคับให้เลือก
            />
          </div>

          <div>
            <label
              htmlFor="countEmployee"
              className="block font-medium text-gray-700"
            >
              จำนวนพนักงาน (Employee)
            </label>
            <input
              type="number"
              id="countEmployee"
              placeholder="Enter employee name"
              name="countEmployee"
              value={data.countEmployee}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              required // บังคับให้เลือก
            />
          </div>

          {/* ระบบ ePayment */}
          {/* <label className="mt-3">รองรับ ePayment</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="have ePayment"
                checked={data.ePayment === true} // ตรวจสอบว่ามีePayment
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    ePayment: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              รองรับ
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="no ePayment"
                checked={data.ePayment === false} // ตรวจสอบว่าไม่มีePayment
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    ePayment: e.target.checked ? false : true,
                  }))
                }
                className="mr-2"
              />
              ไม่รองรับ
            </label>
          </div>
          {/* ระบบ report */}
          {/* <label className="mt-3">รายงานยอดขาย</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="have reportSale"
                checked={data.reportSale === true} // ตรวจสอบว่ามีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    reportSale: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              รองรับ
            </label> */}

          {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="no reportSale"
                checked={data.reportSale === false} // ตรวจสอบว่าไม่มีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    reportSale: e.target.checked ? false : true,
                  }))
                }
                className="mr-2"
              />
              ไม่รองรับ
            </label>
          </div> */}

          {/* ระบบ จัดการพนักงาน */}
          {/* <label className="mt-3">ระบบจัดการพนักงาน</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="have manageEmployee"
                checked={data.manageEmployee === true} // ตรวจสอบว่ามีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    manageEmployee: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              รองรับ
            </label> */}

          {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="no manageEmployee"
                checked={data.manageEmployee === false} // ตรวจสอบว่าไม่มีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    manageEmployee: e.target.checked ? false : true,
                  }))
                }
                className="mr-2"
              />
              ไม่รองรับ
            </label>
          </div> */}

          {/* รูปเมนู */}
          {/* <label className="mt-3">รูปเมนู</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="have eMenu"
                checked={data.eMenu === true} // ตรวจสอบว่ามีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    eMenu: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              รองรับ
            </label> */}

          {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="no eMenu"
                checked={data.eMenu === false} // ตรวจสอบว่าไม่มีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    eMenu: e.target.checked ? false : true,
                  }))
                }
                className="mr-2"
              />
              ไม่รองรับ
            </label>
          </div> */}

          {/* ระบบจัดการร้าน */}
          {/* <label className="mt-3">ระบบจัดการร้าน</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="have manageStore"
                checked={data.manageStore === true} // ตรวจสอบว่ามีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    manageStore: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              รองรับ
            </label> */}

          {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="no manageStore"
                checked={data.manageStore === false} // ตรวจสอบว่าไม่มีพนักงาน
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    manageStore: e.target.checked ? false : true,
                  }))
                }
                className="mr-2"
              />
              ไม่รองรับ
            </label>
          </div> */}

          {/* ระบบออร์เดอร์ผ่าน App */}
          {/* <label className="mt-3">ออร์เดอร์เดลิเวอรี่</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="grab"
                checked={data.delivery.grab} // เช็คว่ามีบริการ Grab
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    delivery: { ...prev.delivery, grab: e.target.checked }, // อัพเดทค่า Grab
                  }))
                }
                className="mr-2"
              />
              Grab
            </label>
            {data.delivery.grab && ( // แสดงรูปภาพ Grab ถ้าเลือก
              <img
                src={grabImageUrl}
                alt="Grab"
                className="w-20 h-20 object-cover"
              />
            )} */}

          {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="lineman"
                checked={data.delivery.lineman} // เช็คว่ามีบริการ Lineman
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    delivery: { ...prev.delivery, lineman: e.target.checked }, // อัพเดทค่า Lineman
                  }))
                }
                className="mr-2"
              />
              Lineman
            </label>
            {data.delivery.lineman && ( // แสดงรูปภาพ Lineman ถ้าเลือก
              <img
                src={linemanImageUrl}
                alt="Lineman"
                className="w-20 h-20 object-cover"
              />
            )}
          </div> */}

          {/* ทีม Support */}
          {/* <label htmlFor="Support" className="mt-3">
            เวลาทำการ Support
          </label>
          <input
            type="text"
            id="teamsSupport"
            placeholder="Enter Teams Support"
            name="teamsSupport"
            value={data.teamsSupport}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          /> */}

          <div>
            <label
              htmlFor="price"
              className="block font-medium text-gray-700"
            >
              ราคาแพ็คเกจ (Price)
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter price name"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              required // บังคับให้เลือก
            />
          </div>

          {/* <label htmlFor="categoryStore" className="mt-3">
            ประเภทของร้านค้า (Category)
          </label>
          <select
            id="categoryStore"
            name="categoryStore"
            value={data.categoryStore}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required // บังคับให้เลือก
          >
            <option value="">เลือกประเภทของร้านค้า</option>
            <option value="restaurant">ร้านอาหาร</option>
            <option value="beverage">ร้านเครื่องดื่ม</option>
            <option value="grocery">ร้านขายของชำ</option>
          </select> */}

          {/* <label htmlFor="openingHours" className="mt-3">
            เวลาเปิด-ปิดร้าน (Opening Hours)
          </label>
          <div className="flex gap-4">
            <input
              type="time"
              id="openingTime"
              name="openingTime"
              value={data.openingTime || ""}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              placeholder="Enter opening time"
              required // บังคับให้เลือก
            />

            <input
              type="time"
              id="closingTime"
              name="closingTime"
              value={data.closingTime || ""}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
              placeholder="Enter closing time"
              required // บังคับให้เลือก
            />
          </div>

          <label htmlFor="holidays" className="mt-3">
            วันหยุดประจำ (Weekly Holidays)
          </label>
          <select
            id="holidays"
            name="holidays"
            value={data.holidays || ""}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">เลือกวันหยุด</option>
            <option value="sunday">วันอาทิตย์</option>
            <option value="monday">วันจันทร์</option>
            <option value="tuesday">วันอังคาร</option>
            <option value="wednesday">วันพุธ</option>
            <option value="thursday">วันพฤหัสบดี</option>
            <option value="friday">วันศุกร์</option>
            <option value="saturday">วันเสาร์</option>
          </select>

          <label className="mt-3">
            วิธีการชำระเงินที่รองรับ (Payment Methods)
          </label>
          <div className="flex flex-col gap-2">
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
          </div> */}

          <button className="px-3 py-2 bg-red-600 text-white mt-5 hover:bg-red-700">
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePackage;
