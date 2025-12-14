import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Nav/navbar";
import { AdminDrawer } from "../aside/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div data-test="admin-dashboard">
      <Navbar />

      {/* Top bar BELOW NAVBAR */}
      <div
        className="flex px-4 py-4 bg-[#054003] items-center mt-[64px] lg:mt-[72px]"
        data-test="admin-topbar"
      >
        <button
          className="mr-4 text-white text-2xl lg:hidden"
          onClick={handleDrawerToggle}
          data-test="admin-drawer-toggle"
          aria-label="Toggle sidebar"
        >
          {drawerOpen ? <IoMdClose /> : <FaBars />}
        </button>

        <span
          className="text-white text-lg font-semibold"
          data-test="admin-welcome-text"
        >
          Welcome to your Admin dashboard
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
          data-test="admin-sidebar"
        >
          <div>
            {/* close button on mobile */}
            <button
              className="absolute top-4 right-4 text-white text-4xl lg:hidden"
              onClick={handleDrawerToggle}
              aria-label="Close sidebar"
              data-test="admin-sidebar-close"
            >
              <IoMdClose />
            </button>
            <AdminDrawer data-test="admin-drawer-items" />
          </div>
        </aside>

        {/* Main content */}
        <main
          className="flex-1 bg-[#E6F4E8] min-h-screen p-4"
          data-test="admin-main-content"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;




