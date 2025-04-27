import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";

const MainRoute = createBrowserRouter([
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default MainRoute;
