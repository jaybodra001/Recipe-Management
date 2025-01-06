import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Welcome to {"<"}Foodie{"/>"}</h2>
            <p className="text-gray-700">
              This is the main content area where you can add your components
              and features.
            </p>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full lg:hidden shadow-md"
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

export default Home;
