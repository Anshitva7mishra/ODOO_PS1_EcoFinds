import { ShoppingBag, Leaf, MapPin } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext"; // Import CartContext

const Navbar = ({ location = null }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cartCount } = useCart(); // Get cart count from context

  const toggleDropdown = () => {
    if (dropdownRef.current) dropdownRef.current.classList.toggle("hidden");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dropdownRef.current.classList.add("hidden");
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
              onClick={toggleDropdown}
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

          {/* Cart + Sign In */}
          <div className="flex items-center gap-8">
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

            <Link
              to="/signin"
              className="px-4 py-1 bg-[#007BFF] rounded-md text-white hover:bg-[#0066CC] transition-all duration-200 text-base font-medium"
            >
              Sign In
            </Link>
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

          <Link
            to="/cart"
            className="flex items-center gap-2 p-2 hover:text-[#007BFF]"
          >
            <IoCartOutline className="h-7 w-7" /> Cart{" "}
            <span className="bg-[#007BFF] px-3 py-1 rounded-full absolute -top-3 -right-3 text-white text-sm font-semibold">
              {cartCount}
            </span>
          </Link>

          <Link
            to="/signin"
            className="px-4 py-1 bg-[#007BFF] rounded-md text-white hover:bg-[#0066CC] transition-all duration-200 text-base font-medium"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
