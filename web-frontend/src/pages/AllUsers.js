import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { BiSolidEdit } from "react-icons/bi";
import ChangeUserRole from "../components/user/ChangeUserRole";
import { useSelector } from "react-redux"; // ใช้เพื่อดึงข้อมูล user ที่ล็อกอินอยู่
import ROLE from "../common/role"; // import role
import ChangeStoreMember from "../components/ChangeStoreMember";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    _id: "",
    account_name: "",
    phone: "",
    email: "",
    role: "",
  });

  const user = useSelector((state) => state?.user?.user); // ดึงข้อมูล user ที่ล็อกอิน

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      let filteredUsers = dataResponse.data;

      // ถ้า user ที่ล็อกอินอยู่เป็น STORE_OWNER หรือ MANAGER จะกรองไม่ให้เห็น ADMIN
      if (user?.role === ROLE.STORE_OWNER || user?.role === ROLE.MANAGER) {
        filteredUsers = filteredUsers.filter((el) => el.role !== ROLE.ADMIN);
      }

      setAllUsers(filteredUsers);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [user]);

  const [openChangeStoreMember, setOpenChangeStoreMember] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white py-3 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Member</h2>
      </div>

      {/* ตารางสมาชิก */}
      <div className="flex-1 overflow-y-auto gap-5 py-2 mt-4">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-black text-white">
              <th>ลำดับ</th>
              <th>ชื่อผู้ใช้</th>
              <th>อีเมล์</th>
              <th>เบอร์โทร</th>
              <th>สิทธิ์</th>
              <th>วันที่ลงทะเบียน</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.length > 0 ? (
              allUser.map((el, index) => (
                <tr key={el._id}>
                  <td>{index + 1}</td>
                  <td>{el?.account_name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.phone}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format("DD/MM/YYYY")}</td>
                  <td>
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                      onClick={() => {
                        setUpdateUserDetails(el);
                        setOpenUpdateRole(true);
                      }}
                    >
                      <BiSolidEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  ไม่มีข้อมูลสมาชิก
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal สำหรับแก้ไขสิทธิ์ผู้ใช้ */}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          userId={updateUserDetails._id}
          account_name={updateUserDetails.account_name}
          phone={updateUserDetails.phone}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
