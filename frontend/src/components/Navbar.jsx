import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-red-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">{"<"}Foodie{"/>"}</h1>
      <nav className="space-x-4">
        <NavLink to="/login" className="text-white hover:bg-red-800 p-2 hover:rounded-md">Login</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
