import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div>This is the home page</div>,
      },
    ],
  },
]);

export default MainRoute;
