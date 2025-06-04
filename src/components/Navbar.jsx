import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingCartIcon,
  ListIcon,
  XIcon,
  CaretCircleDownIcon,
} from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { Menu } from "@headlessui/react";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((x, item) => x + item.quantity, 0);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          Online Shopping
        </NavLink>
        {/* for mobile menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>
        {/* hidden on small screens */}
        <div className="hidden md:flex items-center gap-5">
          <NavLinks
            totalItems={totalItems}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
        </div>
      </div>

      {/* Mobile menu - shown only when menuOpen is true */}
      {menuOpen && (
        <div className="flex flex-col mt-3 gap-3 md:hidden">
          <NavLinks
            totalItems={totalItems}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            onLinkClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

const user = JSON.parse(localStorage.getItem("userData"));

const NavLinks = ({ totalItems, onLinkClick, isLoggedIn, onLogout }) => (
  <>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? "text-amber-500" : "text-white hover:text-amber-400")}
      onClick={onLinkClick}
    >
      Home
    </NavLink>
    <NavLink
      to="/Contact"
      className={({ isActive }) => (isActive ? "text-amber-500" : "text-white hover:text-amber-400")}
      onClick={onLinkClick}
    >
      Contact
    </NavLink>

    {isLoggedIn && (
      <Menu as="div" className="relative">
        <Menu.Button className="inline-flex items-center gap-1 text-white hover:text-amber-400 outline-none">
          {user.name}
          <CaretCircleDownIcon className="h-5 w-5 text-white" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-30 origin-top-right rounded-md bg-white outline-none">
          <div className="py-1">
            <Menu.Item>
                <button
                  onClick={() => {
                    onLogout();
                  }}
                  className="block px-9.5 py-2 text-sm text-gray-700 data-focus:bg-gray-300 data-focus:text-gray-900 outline-hidden"
                >
                  Logout
                </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    )}

    <NavLink
      to="/cart"
      className={({ isActive }) => (isActive ? "text-amber-500" : "text-white hover:text-amber-400")}
      onClick={onLinkClick}
    >
      <div className="relative flex items-center gap-1">
        <ShoppingCartIcon size={24} />
        <span>({totalItems})</span>
      </div>
    </NavLink>
  </>
);

export default Navbar;
