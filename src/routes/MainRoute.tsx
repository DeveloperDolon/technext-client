import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import ClientManagement from "../pages/client_management/ClientManagement";

const MainRoute = createBrowserRouter([
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard/",
        element: <Dashboard />,
      },
      {
        path: "client-management/",
        element: <ClientManagement />
      }
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
