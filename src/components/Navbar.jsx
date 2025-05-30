import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((x, item) => x + item.quantity, 0);
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Online Shopping</h1>
      <div className="flex items-center gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : "text-white"
          }
        >
          Home
        </NavLink>
        {/* <NavLink
          to="/About"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : "text-white"
          }
        >
          About
        </NavLink> */}
        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : "text-white"
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "text-amber-500" : "text-white"
          }
        >
          <div className="relative flex items-center gap-1">
            <ShoppingCartIcon size={24} />
            <span>({totalItems})</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
