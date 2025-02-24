// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext); // Destructuring token and setToken from context
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 border-b border-gray-400 mb-3.5">
      {/* Logo */}
      <h1
        onClick={() => navigate('/')}
        className="text-green-500 font-bold bg-gray-50 p-3 shadow-lg uppercase cursor-pointer"
      >
        Medicare
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-5 items-start font-medium">
        <NavLink to="/" className="py-1">
          Home
        </NavLink>
        <NavLink to="/doctors" className="py-1">
          All Doctors
        </NavLink>
        <NavLink to="/about" className="py-1">
          About
        </NavLink>
        <NavLink to="/contact" className="py-1">
          Contact
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            <div className="absolute top-10 right-0 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-900 text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 right-0 bottom-0 z-20 w-full bg-white transition-all">
          <div className="flex items-center justify-between px-5 py-6">
            <h1
              onClick={() => {
                setShowMenu(false);
                navigate('/');
              }}
              className="text-green-500 font-bold bg-gray-50 p-3 shadow-lg uppercase cursor-pointer"
            >
              Medicare
            </h1>
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className="px-4 py-2 rounded"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className="px-4 py-2 rounded"
            >
              All Doctors
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className="px-4 py-2 rounded"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className="px-4 py-2 rounded"
            >
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
