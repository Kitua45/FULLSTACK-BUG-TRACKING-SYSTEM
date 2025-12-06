import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Nav/navbar";
import { UserDrawer } from "../aside/userdrawer";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div>
      <Navbar />

      {/* Top bar BELOW NAVBAR */}
      <div className="flex px-4 py-4 bg-[#054003] items-center mt-[64px] lg:mt-[72px]">
        <button
          className="mr-4 text-white text-2xl lg:hidden"
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <IoMdClose /> : <FaBars />}
        </button>

        <span className="text-white text-lg font-semibold">
          Welcome to your User dashboard
        </span>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`
            fixed top-[120px] z-40 w-64 bg-[#054003] text-white
            ${drawerOpen ? "" : "hidden"}
            lg:static lg:block lg:w-64 lg:top-0
          `}
          style={{ minHeight: "100vh" }}
        >
          <div>
            {/* close button on mobile */}
            <button
              className="absolute top-4 right-4 text-white text-4xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoMdClose />
            </button>

            {/* FIXED COMPONENT */}
            <UserDrawer />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-[#E6F4E8] min-h-screen p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
