import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center sticky">
      <div className="text-white text-2xl">Book Review App</div>
      <div className="flex items-center">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 px-4 py-2 rounded mr-2">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-blue-600 px-4 py-2 rounded">
              Sign Up
            </button>
          </>
        ) : (
          <div className="relative">
            <div
              className="bg-white text-blue-600 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}>
              {user.username
                .split(" ")
                .map((name) => name[0].toUpperCase())
                .join("")}
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="block px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left">
                  Profile
                </button>
                <button
                  onClick={onLogout}
                  className="block px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
