import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // เริ่มต้นเป็น false เพื่อซ่อนรหัสผ่าน
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
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
                  required
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
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                ลืมรหัสผ่าน ?
              </Link>
            </div>
            <div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[90%] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                เข้าสู่ระบบ
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[90%] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Line
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 w-full max-w-[90%] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Google
              </button>
            </div>
          </form>

          <p className="my-5">
            ยังไม่มีบัญชี ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              ลงทะเบียน
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
