import React from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { handleError } from "../../helpers/errorHandler";

const DeleteStore = ({ onClose, storeId, refreshStores }) => {
  const handleDelete = async () => {
    try {
      const { url, method } = SummaryApi.deleteStore(storeId);
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        toast.success("Store deleted successfully");
        refreshStores();
        onClose();
      } else {
        handleError({ ...responseData, status: response.status });
      }
    } catch (error) {
      handleError(error);
      console.error("Error occurred while deleting store:", error);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-md">
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">ลบร้านค้า</h2>
        </div>
        <div className="p-4 text-gray-700">
          <p>คุณแน่ใจหรือว่าต้องการลบร้านค้านี้?</p>
        </div>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStore;
