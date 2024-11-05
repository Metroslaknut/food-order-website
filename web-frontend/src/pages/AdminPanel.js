import React, { useEffect, useState } from "react";
import { FaRegCircleUser, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { IoStorefrontOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineBarChart, AiOutlineAppstore } from "react-icons/ai";
import { RiShoppingBag4Line } from "react-icons/ri";
import { FiPackage, FiUserPlus } from "react-icons/fi";
import { GrUserSettings } from "react-icons/gr";
import { TbSettingsCheck } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  // State สำหรับควบคุมการเปิด/ปิดเมนู
  const [isSettingOpen, setIsSettingOpen] = useState(() => {
    return localStorage.getItem("isSettingOpen") === "true";
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(() => {
    return localStorage.getItem("isUserMenuOpen") === "true";
  });

  useEffect(() => {
    // ไม่ทำการนำผู้ใช้กลับไปหน้าแรก แต่สามารถแจ้งเตือนหรือตรวจสอบบทบาทที่นี่ได้
    if (![ROLE.ADMIN, ROLE.STORE_OWNER, ROLE.MANAGER].includes(user?.role)) {
      // คุณอาจจะแสดงข้อความแจ้งเตือนที่นี่
      console.warn("Access denied: You do not have the appropriate role.");
      // หรือสามารถเปลี่ยนเส้นทางไปยังหน้าอื่นที่เหมาะสม
      // navigate("/unauthorized");
    }
  }, [user, navigate]);

  // ฟังก์ชันสำหรับเปลี่ยนสถานะเมนู Settings
  const toggleSettingsMenu = () => {
    const newState = !isSettingOpen;
    setIsSettingOpen(newState);
    localStorage.setItem("isSettingOpen", newState);
  };

  // ฟังก์ชันสำหรับเปลี่ยนสถานะเมนู Users
  const toggleUserMenu = () => {
    const newState = !isUserMenuOpen;
    setIsUserMenuOpen(newState);
    localStorage.setItem("isUserMenuOpen", newState);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.account_name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.account_name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        <nav className="grid p-4">
          {[ROLE.STORE_OWNER, ROLE.MANAGER, ROLE.ADMIN].includes(user?.role) && (
            <>
              <div className="p-2 py-1">
                <Link
                  to={"dashboard"}
                  className="flex items-center gap-2 p-2 py-1 hover:bg-slate-100 rounded"
                >
                  <AiOutlineBarChart className="text-xl text-gray-600" />
                  <span className="text-gray-700">Dashboard</span>
                </Link>
              </div>

              <div className="p-2 py-1">
                <Link
                  to={"all-store"}
                  className="flex items-center gap-2 p-2 py-1 hover:bg-slate-100 rounded"
                >
                  <IoStorefrontOutline className="text-xl text-gray-600" />
                  <span className="text-gray-700">Store</span>
                </Link>
              </div>

              <div className="p-2 py-1">
                <Link
                  to={"all-products"}
                  className="flex items-center gap-2 p-2 py-1 hover:bg-slate-100 rounded"
                >
                  <RiShoppingBag4Line className="text-xl text-gray-600" />
                  <span className="text-gray-700">Products</span>
                </Link>
              </div>

              <div className="p-2 py-1">
                <Link
                  to={"category"}
                  className="flex items-center gap-2 p-2 py-1 hover:bg-slate-100 rounded"
                >
                  <AiOutlineAppstore className="text-xl text-gray-600" />
                  <span className="text-gray-700">Category</span>
                </Link>
              </div>

              {/* เมนู All User พร้อมเมนูย่อย */}
              <div className="p-2 py-1">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-slate-100 p-2 rounded"
                  onClick={toggleUserMenu}
                >
                  <div className="flex items-center gap-2">
                    <FaRegCircleUser className="text-xl text-gray-600" />
                    <span className="font-medium text-gray-700">All User</span>
                  </div>
                  {isUserMenuOpen ? (
                    <FaChevronUp className="text-md text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-md text-gray-500" />
                  )}
                </div>

                {isUserMenuOpen && (
                  <div className="pl-8 mt-2 space-y-2">
                    <Link
                      to={"all-users"}
                      className="flex items-center gap-2 py-1 hover:bg-slate-50 rounded"
                    >
                      <FiUserPlus className="text-lg text-gray-600" />
                      <span className="text-gray-700">Active Users</span>
                    </Link>
                    <Link
                      to={"all-users/inactive"}
                      className="flex items-center gap-2 py-1 hover:bg-slate-50 rounded"
                    >
                      <TbSettingsCheck className="text-lg text-gray-600" />
                      <span className="text-gray-700">Inactive Users</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* เมนู Setting พร้อมเมนูย่อย */}
              <div className="p-2 py-1">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-slate-100 p-2 rounded"
                  onClick={toggleSettingsMenu}
                >
                  <div className="flex items-center gap-2">
                    <IoSettingsOutline className="text-xl text-gray-600" />
                    <span className="font-medium text-gray-700">Setting</span>
                  </div>
                  {isSettingOpen ? (
                    <FaChevronUp className="text-md text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-md text-gray-500" />
                  )}
                </div>

                {isSettingOpen && (
                  <div className="pl-8 mt-2 space-y-2">
                    <Link
                      to={"setting/userRole"}
                      className="flex items-center gap-2 py-1 hover:bg-slate-50 rounded"
                    >
                      <GrUserSettings className="text-lg text-gray-600" />
                      <span className="text-gray-700">Role</span>
                    </Link>
                    <Link
                      to={"setting/userPermission"}
                      className="flex items-center gap-2 py-1 hover:bg-slate-50 rounded"
                    >
                      <TbSettingsCheck className="text-lg text-gray-600" />
                      <span className="text-gray-700">Permission</span>
                    </Link>
                    <Link
                      to={"setting/notifications"}
                      className="flex items-center gap-2 py-1 hover:bg-slate-50 rounded"
                    >
                      <IoMdNotificationsOutline className="text-lg text-gray-600" />
                      <span className="text-gray-700">Notifications</span>
                    </Link>
                    <Link
                      to={"setting/all-package"}
                      className="flex items-center gap-2 py-1 hover:bg-slate-50 rounded"
                    >
                      <FiPackage className="text-lg text-gray-600" />
                      <span className="text-gray-700">Package</span>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;