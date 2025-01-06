import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isVisible }) => {
  return (
    <aside
      className={`bg-red-200 text-black w-64 p-4 space-y-4 ${
        isVisible ? "block" : "hidden"
      } lg:block`}
    >
      <NavLink
        to="/"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/list"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Recipe Listing
      </NavLink>
      <NavLink
        to="/view"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Recipe View
      </NavLink>
      <NavLink
        to="/form"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Add Recipe
      </NavLink>
      <NavLink
        to="#"
        className="block p-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Logout
      </NavLink>
    </aside>
  );
};

export default Sidebar;
