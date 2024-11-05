import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import SummaryApi from "../common"; // นำเข้า API ที่จำเป็น
import { FaExclamationTriangle } from "react-icons/fa";

// ฟังก์ชันสำหรับดูรายละเอียดร้านค้า
export const handleView = (setOpenViewData, setViewData) => {
  setViewData(store);
  setOpenViewData(true);
};

// ฟังก์ชันสำหรับแก้ไขร้านค้า
export const handleEdit = (setOpenUpdateData, setUpdateData) => {
  setUpdateData(store);
  setOpenUpdateData(true);
};

// ฟังก์ชันสำหรับลบร้านค้า
export const handleDelete = (setOpenDeleteData, setDeleteData) => {
  setDeleteData(store);
  setOpenDeleteData(true);
};
