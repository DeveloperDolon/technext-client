import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";

const DashboardHeader = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialDark = storedTheme ? storedTheme === "dark" : systemDark;

    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
  };

  return (
    <header className="flex justify-between items-center p-6 px-0">
      <h1 className="md:text-2xl sm:text-xl text-lg font-semibold text-white">
        Dashboard
      </h1>

      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {isDark ? (
          <MdLightMode size={20} className="text-yellow-400" />
        ) : (
          <MdDarkMode size={20} className="text-gray-700" />
        )}
      </button>
    </header>
  );
};

export default DashboardHeader;
