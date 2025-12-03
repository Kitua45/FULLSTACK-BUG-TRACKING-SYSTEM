import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          BugTracker
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-green-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-green-600">About</Link></li>
          <li><Link to="/services" className="hover:text-green-600">Services</Link></li>
          <li>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-50"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* HAMBURGER (only on small screens) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 p-6 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/services" onClick={() => setOpen(false)}>Services</Link></li>

            <li>
              <Link
                to="/register"
                className="block px-4 py-2 rounded-lg bg-green-600 text-white"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="block px-4 py-2 rounded-lg border border-green-600 text-green-700"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

