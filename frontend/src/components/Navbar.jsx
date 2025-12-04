import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // npm install lucide-react

const Navbar = (props) => {
  const { setToken } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    isActive
      ? "bg-white text-orange-600 font-bold px-3 py-1 rounded-lg shadow"
      : "hover:bg-orange-600 hover:text-white px-3 py-1 rounded-lg transition";

  return (
    <nav className="bg-orange-500 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide">
          🌱 Nursery Manager
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 font-medium">
          <li>
            <NavLink to="/" end className={linkClasses}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/buyers" className={linkClasses}>
              Buyers
            </NavLink>
          </li>
          <li>
            <NavLink to="/workers" className={linkClasses}>
              Workers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className={linkClasses}>
              Admin
            </NavLink>
          </li>
           <li>
            <NavLink to="/plantsentry" className={linkClasses}>
              PlantsEntry
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={linkClasses}>
              <button onClick={handleLogout}>Logout</button>
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-orange-400 rounded-lg shadow-lg p-4">
          <ul className="flex flex-col space-y-3 font-medium">
            <li>
              <NavLink to="/" end className={linkClasses} onClick={toggleMenu}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/buyers"
                className={linkClasses}
                onClick={toggleMenu}
              >
                Buyers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/workers"
                className={linkClasses}
                onClick={toggleMenu}
              >
                Workers
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className={linkClasses} onClick={toggleMenu}>
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink to="/plantsentry" className={linkClasses} onClick={toggleMenu}>
                PlantsEntry
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={linkClasses} onClick={toggleMenu}>
                <button onClick={handleLogout}>Logout</button>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
