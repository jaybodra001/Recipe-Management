import React from "react";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <header className="bg-red-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">{"<"}Foodie{"/>"}</h1>
      <nav className="space-x-4">
        {/* Check if user exists before accessing user.name */}
        {user ? (
          <a className="text-white hover:bg-red-800 p-2 hover:rounded-md"> Welcome, {user.name}</a>
        ) : (
          <a className="text-white hover:bg-red-800 p-2 hover:rounded-md">Welcome, Guest</a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
