import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import Category from "../pages/Category";
import Dashboard from "../pages/Dashboard";
import AllStore from "../pages/AllStore";
import UserRole from "../pages/setting/UserRole";
import UserPermission from "../pages/setting/UserPermission";
import Notifications from "../pages/setting/Notifications";
import Package from "../pages/setting/Package";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "all-store",
            element: <AllStore />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "category",
            element: <Category />,
          },
          // เพิ่มเมนูย่อยของ Setting
          {
            path: "setting",
            children: [
              {
                path: "userRole",
                element: <UserRole />,
              },
              {
                path: "userPermission",
                element: <UserPermission />,
              },
              {
                path: "notifications",
                element: <Notifications />,
              },
              {
                path: "all-package",
                element: <Package />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;