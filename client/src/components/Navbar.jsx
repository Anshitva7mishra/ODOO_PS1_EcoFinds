import { ShoppingBag, Leaf, MapPin, UserCog } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuthStore } from "../store/authStore"; // <-- Zustand store

const Navbar = ({ location = null }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] py-3 shadow-2xl text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10">
        {/* Logo + Location */}
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="text-[#007BFF] w-8 h-8" />
              <Leaf className="text-green-400 w-3 h-3 absolute bottom-0 right-0 rotate-12" />
            </div>
            <span className="font-bold text-2xl">
              <span className="text-white">Eco</span>
              <span className="text-[#007BFF]">Finds</span>
            </span>
          </NavLink>

          {/* Desktop location */}
          {location && (
            <div
              onClick={() => setProfileOpen(false)}
              className="hidden md:flex items-center gap-1 cursor-pointer relative"
            >
              <MapPin className="text-[#007BFF]" />
              <span className="font-semibold text-white text-sm sm:text-base">
                <div className="-space-y-1">
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              </span>
            </div>
          )}
        </div>

        {/* Desktop Menu + Cart */}
        <nav className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-6 items-center text-lg font-semibold">
            {["Home", "Products", "About", "Contact"].map((p) => (
              <NavLink
                key={p}
                to={`/${p.toLowerCase() === "home" ? "" : p.toLowerCase()}`}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-4 border-[#007BFF]" : "text-white/70"
                  } cursor-pointer`
                }
              >
                <li>{p}</li>
              </NavLink>
            ))}
          </ul>

          {/* Cart + Profile/Auth */}
          <div className="flex items-center gap-8 relative">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:text-[#007BFF] transition-colors duration-200"
            >
              <IoCartOutline className="h-8 w-8" />
              {cartCount > 0 && (
                <span className="bg-[#007BFF] px-3 py-1 rounded-full absolute -top-3 -right-3 text-white text-sm font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile / Sign In */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center hover:bg-[#0066CC] transition"
                >
                  <UserCog className="text-white w-6 h-6" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      User Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1 bg-[#007BFF] rounded-md text-white hover:bg-[#0066CC] transition-all duration-200 text-base font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((s) => !s)}
          className="md:hidden p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {["Home", "Products", "About", "Contact"].map((p) => (
            <NavLink
              key={p}
              to={`/${p.toLowerCase() === "home" ? "" : p.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-semibold text-white"
            >
              {p}
            </NavLink>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-2 p-2 hover:text-[#007BFF]"
          >
            <IoCartOutline className="h-7 w-7" /> Cart{" "}
            {cartCount > 0 && (
              <span className="bg-[#007BFF] px-3 py-1 rounded-full text-white text-sm font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Profile / Sign In */}
          {isAuthenticated ? (
            <div className="flex flex-col gap-2 mt-2 bg-gray-900 p-3 rounded-lg">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md bg-[#007BFF] text-white text-center"
              >
                User Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md bg-red-600 text-white text-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 bg-[#007BFF] rounded-md text-white hover:bg-[#0066CC] transition-all duration-200 text-base font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
