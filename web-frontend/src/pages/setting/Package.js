import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import moment from "moment";
import { BiSolidEdit } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import CreatePackage from "../../components/package/CreatePackage";
import ViewPackage from "../../components/package/ViewPackage";

const AllPackage = () => {
  const [openCreatePackage, setOpenCreatePackage] = useState(false);
  const [openViewPackage, setOpenViewPackage] = useState(false);
  const [allPackage, setAllPackage] = useState([]);
  const [viewPackageDetails, setViewPackageDetails] = useState(null);
  const [updatePackageDetails, setUpdatePackageDetails] = useState(null);

  const fetchAllPackage = async () => {
    try {
      const response = await fetch(SummaryApi.getPackage.url, {
        method: SummaryApi.getPackage.method,
        credentials: "include",
      });
  
      const data = await response.json();
      console.log("API Response:", data);
      setAllPackage(data.packages);
    } catch (error) {
      console.error("Error fetching package:", error);
      toast.error("Error fetching package.");
    }
  };

  useEffect(() => {
    console.log("useEffect: fetching packages");
    fetchAllPackage();
  }, []);

  const handleViewPackage = (pkg) => {
    setViewPackageDetails(pkg);
    setOpenViewPackage(true);
  };

  const handleEditPackage = (pkg) => {
    setUpdatePackageDetails(pkg);
    setOpenCreatePackage(true);
  };

  const handleDeletePackage = (pkgId) => {
    toast.info("Delete functionality not implemented yet.");
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">แพ็คเกจ</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenCreatePackage(true)}
        >
          + Create
        </button>
      </div>
      <div className="flex-1 overflow-y-auto gap-5 py-2 mt-4">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>ลำดับ</th>
              <th>แพ็คเกจ</th>
              <th>ราคาแพ็คเกจ</th>
              <th>ส่วนลดแพ็คเกจ</th>
              <th>วันที่เริ่ม</th>
              <th>วันที่สิ้นสุด</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPackage.length > 0 ? (
              allPackage.map((pkg, index) => (
                <tr key={pkg._id}>
                  <td>{index + 1}</td>
                  <td>{pkg.packageName}</td>
                  <td>{pkg.price}</td>
                  <td>{pkg.promotion}</td>
                  <td>{moment(pkg.startDate).format("DD/MM/YYYY")}</td>
                  <td>{moment(pkg.endDate).format("DD/MM/YYYY")}</td>
                  <td className="text-center w-24">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                        onClick={() => handleViewPackage(pkg)}
                      >
                        <HiOutlineDocumentReport />
                      </button>
                      <button
                        className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                        onClick={() => handleEditPackage(pkg)}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                        onClick={() => handleDeletePackage(pkg._id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No packages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openCreatePackage && (
        <CreatePackage
          onClose={() => setOpenCreatePackage(false)}
          packageDetails={updatePackageDetails}
          refreshPackages={fetchAllPackage} // ส่งฟังก์ชันไปที่นี่
        />
      )}
      {openViewPackage && (
        <ViewPackage
          onClose={() => setOpenViewPackage(false)}
          packageDetails={viewPackageDetails}
          refreshPackages={fetchAllPackage} // ส่งฟังก์ชันไปที่นี่
        />
      )}
    </div>
  );
};

export default AllPackage;