// import React, { useEffect, useState } from "react";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import moment from "moment";
// import { handleError } from "../helpers/errorHandler";
// import { BiSolidEdit } from "react-icons/bi";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { MdDeleteOutline } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { FaExclamationTriangle } from "react-icons/fa";
// import CreateStore from "../components/stores/CreateStore";
// import UpdateStore from "../components/stores/UpdateStore";
// import ViewStore from "../components/stores/ViewStore";
// import DeleteStore from "../components/stores/DeleteStore";

// const AllStore = () => {
//   const [openCreateStore, setOpenCreateStore] = useState(false);
//   const [openViewStore, setOpenViewStore] = useState(false);
//   const [openUpdateStore, setOpenUpdateStore] = useState(false);
//   const [openDeleteStore, setOpenDeleteStore] = useState(false);
//   const [allStore, setAllStore] = useState([]);
//   const [updateUserDetails, setUpdateUserDetails] = useState({});
//   const [ViewStoreDetails, setViewStoreDetails] = useState({});
//   const [storeUpdated, setStoreUpdated] = useState(false);

//   const user = useSelector((state) => state?.user?.user);

//   const fetchAllStore = async () => {
//     try {
//       const response = await fetch(SummaryApi.getStores.url, {
//         method: SummaryApi.getStores.method,
//         credentials: "include",
//       });

//       const data = await response.json();
//       console.log("API Response:", data);

//       if (response.ok && !data.error) {
//         // กรองร้านค้าตาม userId ที่ตรงกับผู้ใช้ที่ล็อกอิน
//         const userStores = data.stores.filter(
//           (store) => store.userId === user._id
//         );
//         setAllStore(userStores);
//       } else {
//         handleError({ ...data, status: response.status });
//       }
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า:", error);
//       toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า.");
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchAllStore();
//     }
//   }, [user, storeUpdated]);

//   const handleViewStore = (store) => {
//     setViewStoreDetails(store);
//     setOpenViewStore(true);
//   };

//   const handleEditStore = (store) => {
//     setUpdateUserDetails(store);
//     setOpenUpdateStore(true);
//   };

//   // const handleDeleteStore = (storeId) => {
//   //   confirmAlert({
//   //     title: (
//   //       <div style={{ display: "flex", alignItems: "center" }}>
//   //         <FaExclamationTriangle style={{ color: "red", marginRight: "8px" }} />
//   //         <span>ยืนยันการลบ</span>
//   //       </div>
//   //     ),
//   //     message: "คุณต้องการลบร้านค้านี้ใช่หรือไม่?",
//   //     buttons: [
//   //       {
//   //         label: "ลบ",
//   //         onClick: async () => {
//   //           try {
//   //             const { url, method } = SummaryApi.deleteStore(storeId);
//   //             const response = await fetch(url, {
//   //               method: method,
//   //               credentials: "include",
//   //               headers: {
//   //                 "Content-Type": "application/json",
//   //               },
//   //             });

//   //             const responseData = await response.json();

//   //             if (response.ok && responseData.success) {
//   //               toast.success(responseData.message || "ลบร้านสำเร็จแล้ว");
//   //               setStoreUpdated((prev) => !prev);
//   //             } else {
//   //               handleError({ ...responseData, status: response.status });
//   //             }
//   //           } catch (error) {
//   //             handleError(error);
//   //           }
//   //         },
//   //       },
//   //       {
//   //         label: "ยกเลิก",
//   //         onClick: () => {},
//   //       },
//   //     ],
//   //   });
//   // };

//   const handleDeleteStore = (storeId) => {
//     setOpenDeleteStore(true);
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="bg-white py-2 px-4 flex justify-between items-center">
//         <h2 className="font-bold text-lg">Store</h2>
//         <button
//           className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
//           onClick={() => setOpenCreateStore(true)}
//         >
//           + Create
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto gap-5 py-2 mt-4">
//         <table className="w-full userTable">
//           <thead>
//             <tr className="bg-black text-white">
//               <th>ลำดับ</th>
//               <th>ชื่อร้าน</th>
//               <th>รายละเอียด</th>
//               <th>ประเภท</th>
//               <th>สาขา</th>
//               <th>วันที่ลงทะเบียน</th>
//               <th className="w-24">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allStore.length > 0 ? (
//               allStore.map((store, index) => (
//                 <tr key={store._id}>
//                   <td>{index + 1}</td>
//                   <td>{store.storeName}</td>
//                   <td>{store.description}</td>
//                   <td>{store.categoryStore}</td>
//                   <td>{store.branchType}</td>
//                   <td>{moment(store.createdAt).format("DD/MM/YYYY")}</td>
//                   <td className="text-center w-24">
//                     <div className="flex justify-center space-x-2">
//                       <button
//                         className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
//                         onClick={() => handleViewStore(store)}
//                       >
//                         <HiOutlineDocumentReport />
//                       </button>
//                       <button
//                         className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
//                         onClick={() => handleEditStore(store)}
//                       >
//                         <BiSolidEdit />
//                       </button>
//                       <button
//                         className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
//                         onClick={() => handleDeleteStore(store._id)}
//                       >
//                         <MdDeleteOutline />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-4">
//                   No stores found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {openCreateStore && (
//         <CreateStore
//           onClose={() => setOpenCreateStore(false)}
//           refreshStores={fetchAllStore}
//         />
//       )}
//       {openViewStore && (
//         <ViewStore
//           onClose={() => setOpenViewStore(false)}
//           store={ViewStoreDetails}
//           refreshStores={fetchAllStore}
//         />
//       )}
//       {openUpdateStore && (
//         <UpdateStore
//           onClose={() => setOpenUpdateStore(false)}
//           store={updateUserDetails}
//           refreshStores={fetchAllStore}
//         />
//       )}
//       {openDeleteStore && (
//         <DeleteStore
//           onClose={() => setOpenDeleteStore(false)}
//           // store={updateUserDetails}
//           refreshStores={fetchAllStore}
//         />
//       )}
//     </div>
//   );
// };

// export default AllStore;


import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { handleError } from "../helpers/errorHandler";
import { BiSolidEdit } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaExclamationTriangle } from "react-icons/fa";
import CreateStore from "../components/stores/CreateStore";
import UpdateStore from "../components/stores/UpdateStore";
import ViewStore from "../components/stores/ViewStore";
import DeleteStore from "../components/stores/DeleteStore";

const AllStore = () => {
  const [openCreateStore, setOpenCreateStore] = useState(false);
  const [openViewStore, setOpenViewStore] = useState(false);
  const [openUpdateStore, setOpenUpdateStore] = useState(false);
  const [openDeleteStore, setOpenDeleteStore] = useState(false);
  const [allStore, setAllStore] = useState([]);
  const [updateUserDetails, setUpdateUserDetails] = useState({});
  const [viewStoreDetails, setViewStoreDetails] = useState({});
  const [deleteStoreId, setDeleteStoreId] = useState(null);
  const [storeUpdated, setStoreUpdated] = useState(false);

  const user = useSelector((state) => state?.user?.user);

  const fetchAllStore = async () => {
    try {
      const response = await fetch(SummaryApi.getStores.url, {
        method: SummaryApi.getStores.method,
        credentials: "include",
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && !data.error) {
        const userStores = data.stores.filter(
          (store) => store.userId === user._id
        );
        setAllStore(userStores);
      } else {
        handleError({ ...data, status: response.status });
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า:", error);
      toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllStore();
    }
  }, [user, storeUpdated]);

  const handleViewStore = (store) => {
    setViewStoreDetails(store);
    setOpenViewStore(true);
  };

  const handleEditStore = (store) => {
    setUpdateUserDetails(store);
    setOpenUpdateStore(true);
  };

  const handleDeleteStore = (storeId) => {
    setDeleteStoreId(storeId);
    setOpenDeleteStore(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Store</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenCreateStore(true)}
        >
          + Create
        </button>
      </div>

      <div className="flex-1 overflow-y-auto gap-5 py-2 mt-4">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>ลำดับ</th>
              <th>ชื่อร้าน</th>
              <th>รายละเอียด</th>
              <th>ประเภท</th>
              <th>สาขา</th>
              <th>วันที่ลงทะเบียน</th>
              <th className="w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {allStore.length > 0 ? (
              allStore.map((store, index) => (
                <tr key={store._id}>
                  <td>{index + 1}</td>
                  <td>{store.storeName}</td>
                  <td>{store.description}</td>
                  <td>{store.categoryStore}</td>
                  <td>{store.branchType}</td>
                  <td>{moment(store.createdAt).format("DD/MM/YYYY")}</td>
                  <td className="text-center w-24">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                        onClick={() => handleViewStore(store)}
                      >
                        <HiOutlineDocumentReport />
                      </button>
                      <button
                        className="bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"
                        onClick={() => handleEditStore(store)}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                        onClick={() => handleDeleteStore(store._id)}
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
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openCreateStore && (
        <CreateStore
          onClose={() => setOpenCreateStore(false)}
          refreshStores={fetchAllStore}
        />
      )}
      {openViewStore && (
        <ViewStore
          onClose={() => setOpenViewStore(false)}
          store={viewStoreDetails}
          refreshStores={fetchAllStore}
        />
      )}
      {openUpdateStore && (
        <UpdateStore
          onClose={() => setOpenUpdateStore(false)}
          store={updateUserDetails}
          refreshStores={fetchAllStore}
        />
      )}
      {openDeleteStore && deleteStoreId && (
        <DeleteStore
          onClose={() => setOpenDeleteStore(false)}
          storeId={deleteStoreId}
          refreshStores={fetchAllStore}
        />
      )}
    </div>
  );
};

export default AllStore;
