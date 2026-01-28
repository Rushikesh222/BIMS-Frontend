import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext"
import avatar from "../assets/avatar.png";

export const NavBar=()=>{
    const { authData, logoutUser } = useAuth();
    const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    return(
           <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left - Logo */}
      <div className="text-lg font-semibold">
        <span className="text-[#f59e0b]">AI</span>
        <span className="text-gray-800">Books</span>
      </div>

      {/* Right - User */}
      {authData.isAuthenticated && <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <span className="text-sm font-medium text-gray-700">
            {authData.userName}
          </span>

          <img
            src={
              avatar ||
              "https://ui-avatars.com/api/?name=User&background=2f3e2f&color=fff"
            }
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border"
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute  right-0 mt-3 w-44 bg-white rounded-md shadow-lg  z-50">
            <div onClick={() => {
                setOpen(false);
              logoutUser()
              }} className="flex cursor-pointer align-center gap-2 px-4 ">

            <span className="material-icons mt-6">exit_to_app</span>

            <button
              className="w-full px-4 py-2 text-base font-semibold cursor-pointer text-left text-gray-600 font-w hover:bg-red-50 rounded-md"
              >
                Logout
            </button>
            </div>
          </div>
        )}
      </div>}
    </nav>
    )
}