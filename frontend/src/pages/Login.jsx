import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { login, isLoggingIn } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    //const success = await login({ email, password })
    // console.log("Login success:", success)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-6 bg-white border rounded shadow-lg"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        //   disabled={isLoggingIn}
        >
          {/* {isLoggingIn ? "Loading..." : "Login"} */}Login
        </button>
        <div className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
