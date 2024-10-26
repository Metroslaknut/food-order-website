import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import CreatePackage from "../components/Package/CreatePackage";
import { BiSolidEdit } from "react-icons/bi";
import { useSelector } from "react-redux"; // ใช้เพื่อดึงข้อมูล user ที่ล็อกอินอยู่
import ViewPackage from "../components/Package/ViewPackage";

const AllPackage = () => {
  const [openCreatePackage, setOpenCreatePackage] = useState(false); // เ3
   const [openViewPackage, setOpenViewPackage] = useState(false);
  const [allPackage, setAllPackage] = useState([]); // เก็บข้อมูลร้านค้า
  
  const [ViewPackageDetails, setViewPackageDetails] = useState({
    _id: "",
    packageName: "",
    countBranch:"",
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

  const user = useSelector((state) => state?.user?.user); // ดึงข้อมูล user ที่ล็อกอิน

  // ฟังก์ชันสำหรับดึงข้อมูลร้านค้าจาก API
  const fetchAllPackage = async () => {
    try {
      const response = await fetch(SummaryApi.getPackage.url, {
        method: SummaryApi.getPackage.method,
        credentials: "include",
      });

      const data = await response.json(); // แปลงเป็น JSON
      console.log("API Response:", data); // Debug: ตรวจสอบข้อมูลที่ได้จาก API

      if (response.ok && !data.error) {
        setAllPackage(data.package); // เก็บข้อมูลร้านค้าใน state
      } else {
        toast.error(data.message || "Failed to load stores.");
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      toast.error("Error fetching stores.");
    }
  };

  // ดึงข้อมูลร้านค้าเมื่อ component โหลด
  useEffect(() => {
    fetchAllPackage();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">AllPackage</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenCreatePackage(true)} // เปลี่ยนจาก setOpenCreateStore เป็น setOpenCreatePackage
        >
          + Create
        </button>
      </div>

      {/* ตารางร้านค้า */}
      <div className="flex-1 overflow-y-auto gap-5 py-2 mt-4">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>ลำดับ</th>
              <th>Package Name</th>
              <th>จำนวนสาขา</th>
              <th>จำนวนพนักงาน</th>
              <th>รองรับ E-Payment</th>
              <th>รายงานยอดขาย</th>
              <th>ระบบจัดการพนักงาน</th>
              <th>ระบบ E-MENU</th>
              <th>ระบบจัดการสต๊อก</th>
              <th>รับออร์เดอร์เดริเวอรี่</th>
              <th>เชื่อมต่อกับแพลตฟอร์มออนไลน์</th>
              <th>ทีมงานซัพพอร์ตและให้คำปรึกษา</th>
              <th>ราคา</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {allPackage.length > 0 ? (
    allPackage.map((pkg, index) => ( // Changed from `package` to `pkg`
      <tr key={pkg._id}>
        <td>{index + 1}</td>
        <td>{pkg.packageName}</td>
        <td>{pkg.countBranch}</td>
        <td>{pkg.countEmployee}</td>
        <td>{pkg.ePayment}</td>
        <td>{pkg.reportSale}</td>
        <td>{pkg.manageEmployee}</td>
        <td>{pkg.eMenu}</td>
        <td>{pkg.manageStore}</td>
        <td>{pkg.delivery}</td>
        <td>{pkg.platformOnline}</td>
        <td>{pkg.teamsSupport}</td>
        <td>{pkg.price}</td>
        <td>
          <button
            className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
            onClick={() => {
              setViewPackageDetails(pkg); 
              setOpenViewPackage(true);
            }}
          >
          <BiSolidEdit />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-4">
        No stores found.
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {/* Modal สำหรับสร้าง package */}
      {openCreatePackage && (
        <CreatePackage onClose={() => setOpenCreatePackage(false)} /> // ใช้โมดอล CreatePackage
      )}

      {/* Modal สำหรับ view store */}
      {openViewPackage && (
        <ViewPackage
        onClose={() => setOpenViewPackage(false)}
        store={ViewPackageDetails} // Corrected to use ViewPackageDetails
        callFunc={fetchAllPackage} // Correct function name for fetching packages
      />
      )}

     
    </div>
  );
};

export default AllPackage;
