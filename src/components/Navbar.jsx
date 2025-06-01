import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((x, item) => x + item.quantity, 0);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Online Shopping</h1>
        {/* Toggle button for mobile menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>
        {/* Menu links - hidden on small screens */}
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

const NavLinks = ({ totalItems, onLinkClick, isLoggedIn, onLogout }) => (
  <>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? "text-amber-500" : "text-white")}
      onClick={onLinkClick}
    >
      Home
    </NavLink>
    <NavLink
      to="/Contact"
      className={({ isActive }) => (isActive ? "text-amber-500" : "text-white")}
      onClick={onLinkClick}
    >
      Contact
    </NavLink>

    {!isLoggedIn && (
      <NavLink
        to="/Login"
        className={({ isActive }) =>
          isActive ? "text-amber-500" : "text-white"
        }
        onClick={onLinkClick}
      >
        Login
      </NavLink>
    )}

    {isLoggedIn && (
      <button onClick={onLogout} className="hover:underline">
        Logout
      </button>
    )}
    <NavLink
      to="/cart"
      className={({ isActive }) => (isActive ? "text-amber-500" : "text-white")}
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
