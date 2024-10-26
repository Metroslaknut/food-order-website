import React, { useState } from "react";
// import loginIcons from "../assest/signin.gif";
// import imageTobase64 from '../helpers/imageTobase64';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    account_name: "",
    phone: "",
    password: "",
    conPassword: "",
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(""); // สำหรับแสดงข้อความผิดพลาด

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(data.password)) {
      toast.error(
        "รหัสผ่านต้องประกอบด้วยอย่างน้อย 6 ตัวอักษร ตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข"
      );
      setErrorMessage(
        "รหัสผ่านต้องประกอบด้วยอย่างน้อย 6 ตัวอักษร ตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข"
      );
      return;
    }

    if (data.password === data.conPassword) {
      try {
        const dataResponse = await fetch(SummaryApi.signUp.url, {
          method: SummaryApi.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responseData = await dataResponse.json();
        if (responseData.success) {
          toast.success(responseData.message);
          navigate("/login");
        } else if (responseData.error) {
          toast.error(responseData.message);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      toast.error("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="mx-auto text-center">
            <span>ลงทะเบียนใช้งาน</span>
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>ชื่อผู้ใช้ :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="account_name"
                  placeholder="ชื่อผู้ใช้..."
                  name="account_name"
                  value={data.account_name}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>เบอร์โทร :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="tel"
                  placeholder="เบอร์โทร..."
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  pattern="[0-9]*"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>อีเมล์ :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="อีเมล์..."
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>รหัสผ่าน :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="รหัสผ่าน..."
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>ยืนยันรหัสผ่าน :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConPassword ? "text" : "password"}
                  placeholder="ยืนยันรหัสผ่าน..."
                  name="conPassword"
                  value={data.conPassword}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConPassword((preve) => !preve)}
                >
                  <span>{showConPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[90%] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              ลงทะเบียน
            </button>
          </form>

          <p className="my-5">
            มีบัญชีผู้ใช้แล้ว ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
