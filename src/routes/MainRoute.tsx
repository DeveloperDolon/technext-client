import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import ClientManagement from "../pages/client_management/ClientManagement";
import ProjectManagement from "../pages/project_management/ProjectManagement";
import CreateProject from "../pages/project_management/CreateProject";

const MainRoute = createBrowserRouter([
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "client-management",
        element: <ClientManagement />
      },
      {
        path: "project-management",
        element: <ProjectManagement />
      },
      {
        path: "create-project",
        element: <CreateProject />
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
