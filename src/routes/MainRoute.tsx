import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div>This is the home page</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default MainRoute;
