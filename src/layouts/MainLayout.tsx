import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiSettings, FiUser } from "react-icons/fi";
import DashboardHeader from "../components/DashboardHeader";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <button
        onClick={toggleDrawer}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white lg:hidden"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleDrawer}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-200 dark:bg-gray-800 text-white transition-all duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4 dark:text-white text-black">
            <h1 className="text-xl font-bold">CRM</h1>
          </div>

          <nav className="mt-6 flex-1 ">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard/home"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg hover:bg-gray-700 dark:text-white text-black ${
                      isActive ? "bg-gray-700 font-semibold" : ""
                    }`
                  }
                >
                  <FiHome className="mr-3" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/client-management/"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg hover:bg-gray-700 dark:text-white text-black ${
                      isActive ? "bg-gray-700 font-semibold" : ""
                    }`
                  }
                >
                  <FiHome className="mr-3" />
                  Client Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/project-management/"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg hover:bg-gray-700 dark:text-white text-black ${
                      isActive ? "bg-gray-700 font-semibold" : ""
                    }`
                  }
                >
                  <FiHome className="mr-3" />
                  Project Management
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400">© 2023 My App</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:ml-64 ml-10 pt-0 pb-0 dark:bg-slate-950 bg-white">
        <DashboardHeader />

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
