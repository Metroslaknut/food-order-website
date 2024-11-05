import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const CreatePackage = ({ onClose, fetchData, refreshPackages }) => {
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
    stock: "",
    teamsSupport: "",
    timesupport: "",
    price: "",
    promotion: "",
    startDate: "",
    endDate: "",
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
        refreshPackages();
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

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ePayment"
                className="block font-medium text-gray-700"
              >
                รองรับ ePayment
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="ePaymentTrue"
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
                    name="ePaymentFalse"
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
            </div>

            <div>
              <label
                htmlFor="reportSale"
                className="block font-medium text-gray-700"
              >
                รายงานยอดขาย
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reportSaleTrue"
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
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="reportSaleFalse"
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
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="Employee"
                className="block font-medium text-gray-700"
              >
                ระบบจัดการพนักงาน
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="manageEmployeeTrue"
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
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="manageEmployeeFalse"
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
              </div>
            </div>

            <div>
              <label
                htmlFor="eMenu"
                className="block font-medium text-gray-700"
              >
                รูปเมนู
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="eMenuTrue"
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
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="eMenuFalse"
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
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="manageStore"
                className="block font-medium text-gray-700"
              >
                ระบบจัดการร้าน
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="manageStoreTrue"
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
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="manageStoreFalse"
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
              </div>
            </div>

            <div>
              <label
                htmlFor="delivery"
                className="block font-medium text-gray-700"
              >
                ออร์เดอร์เดลิเวอรี่
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="deliveryTrue"
                    checked={data.delivery === true} // ตรวจสอบว่ามีพนักงาน
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        delivery: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  รองรับ
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="deliveryFalse"
                    checked={data.delivery === false} // ตรวจสอบว่าไม่มีพนักงาน
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        delivery: e.target.checked ? false : true,
                      }))
                    }
                    className="mr-2"
                  />
                  ไม่รองรับ
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="Stock"
                className="block font-medium text-gray-700"
              >
                ระบบจัดการคลังสินค้า
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="stockTrue"
                    checked={data.stock === true} // ตรวจสอบว่ามีพนักงาน
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        stock: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  รองรับ
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="stockFalse"
                    checked={data.stock === false} // ตรวจสอบว่าไม่มีพนักงาน
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        stock: e.target.checked ? false : true,
                      }))
                    }
                    className="mr-2"
                  />
                  ไม่รองรับ
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="Stock"
                className="block font-medium text-gray-700"
              >
                ทีมซัพพอร์ต
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="teamsSupportTrue"
                    checked={data.teamsSupport === true} // ตรวจสอบว่ามีพนักงาน
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        teamsSupport: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  รองรับ
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="teamsSupportFalse"
                    checked={data.teamsSupport === false} // ตรวจสอบว่าไม่มีพนักงาน
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        teamsSupport: e.target.checked ? false : true,
                      }))
                    }
                    className="mr-2"
                  />
                  ไม่รองรับ
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="timesupport"
              className="block font-medium text-gray-700"
            >
              เวลาทำการ Support
            </label>
            <input
              type="time"
              id="timesupport"
              placeholder="Enter time Support"
              name="timesupport"
              value={data.timesupport}
              onChange={handleOnChange}
              className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label
                htmlFor="promotion"
                className="block font-medium text-gray-700"
              >
                ส่วนลดแพ็คเกจ (Promotion)
              </label>
              <input
                type="number"
                id="promotion"
                placeholder="Enter price name"
                name="promotion"
                value={data.promotion}
                onChange={handleOnChange}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
                required // บังคับให้เลือก
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block font-medium text-gray-700"
              >
                วันที่เริ่ม (Start date)
              </label>
              <input
                type="date"
                id="startDate"
                placeholder="Enter price name"
                name="startDate"
                value={data.startDate}
                onChange={handleOnChange}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block font-medium text-gray-700"
              >
                วันที่สิ้นสุด (End date)
              </label>
              <input
                type="date"
                id="endDate"
                placeholder="Enter price name"
                name="endDate"
                value={data.endDate}
                onChange={handleOnChange}
                className="w-full bg-slate-100 mt-1 p-3 border rounded-md"
              />
            </div>
          </div>

          <button className="px-3 py-2 bg-red-600 text-white mt-5 hover:bg-red-700">
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePackage;
