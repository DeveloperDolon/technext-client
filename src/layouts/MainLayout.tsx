import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-gray-100 text-gray-900 min-h-screen">
      <Outlet />
      <h1 className="dark:text-red-500 text-yellow-500">Hello world from bangladesh.</h1>
    </div>
  );
};

export default MainLayout;
