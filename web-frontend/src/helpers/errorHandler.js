import { toast } from "react-toastify";

export const handleError = (error) => {
  console.error("Error:", error);

  // Custom error message or default fallback
  const message = error?.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด";

  // Check for network errors
  if (error.message === "Failed to fetch") {
    toast.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ ตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ");
    return;
  }

  // Check if there's a response status and handle accordingly
  if (error?.status) {
    switch (error.status) {
      case 401:
        toast.error("คุณต้องเข้าสู่ระบบเพื่อดำเนินการนี้");
        break;
      case 403:
        toast.error("คุณไม่มีสิทธิ์เข้าถึงข้อมูลนี้");
        break;
      case 404:
        toast.error("ไม่พบข้อมูลที่คุณต้องการ");
        break;
      case 500:
        toast.error("เกิดข้อผิดพลาดที่เซิร์ฟเวอร์");
        break;
      default:
        toast.error(message);
    }
  } else {
    toast.error(message);
  }
};
