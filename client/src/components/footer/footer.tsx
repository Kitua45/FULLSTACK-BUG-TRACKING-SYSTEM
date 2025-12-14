import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* App Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">BugTrack</h2>
          <p className="text-sm text-gray-400">
            BugTrack is a centralized bug tracking and project management system
            designed to improve software quality and team collaboration.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Email: support@bugtrack.com</li>
            <li>Phone: +254 700 000 000</li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BugTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
