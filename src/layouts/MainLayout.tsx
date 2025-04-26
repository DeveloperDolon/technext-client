import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      This is the header
      <Outlet />
    </div>
  );
};

export default MainLayout;
