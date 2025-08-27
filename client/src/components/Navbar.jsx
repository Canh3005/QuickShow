import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, currentUser } = useAuth();
  const user = currentUser;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    setShowMenu(false);
    logout();
    toast.success("Logged out successfully!");
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 max-w-screen">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/"
          className="mx-4 text-lg font-medium hover:text-primary transition"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/movies"
          className="mx-4 text-lg font-medium hover:text-primary transition"
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/"
          className="mx-4 text-lg font-medium hover:text-primary transition"
        >
          Theaters
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/"
          className="mx-4 text-lg font-medium hover:text-primary transition"
        >
          Releases
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0), setIsOpen(false);
          }}
          to="/favorite"
          className="mx-4 text-lg font-medium hover:text-primary transition"
        >
          Favorites
        </Link>
      </div>

      <div className="items-center flex gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </Link>
        ) : (
          <div className="relative" ref={menuRef}>
            <img
              src={user.avatar ? user.avatar : assets.profile}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer object-cover"
              onClick={() => setShowMenu((prev) => !prev)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded shadow-lg z-50 rounded-lg ">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-primary/80 rounded-t-lg cursor-pointer"
                >
                  Thông tin người dùng
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-primary/80 rounded-b-lg cursor-pointer"
                  onClick={handleLogOut}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Navbar;
