import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@phosphor-icons/react";

const Navbar = () => {
  return (
    <div className="navbar bg-gray-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Online Shopping</h1>
        <div className="flex items-center gap-5">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-amber-500' : 'text-white'}>
            Home
          </NavLink>
          <NavLink to="/About" className={({isActive}) => isActive ? 'text-amber-500' : 'text-white'}>
            About
          </NavLink>
          <NavLink to="/Contact" className={({isActive}) => isActive ? 'text-amber-500' : 'text-white'}>
            Contact
          </NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? 'text-amber-500' : 'text-white'}>
            <ShoppingCartIcon size={24} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
