import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  
  const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	const [email, setEmail] = useState(emailValue || "");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

  //  const { signup, isSigningUp } = useAuthStore();

	const handleSignUp = (e) => {
		e.preventDefault();
		//signup({ email, name, password });
	};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form  className="w-full max-w-md p-6 bg-white border rounded shadow-lg" onSubmit={handleSignUp}>
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your name"
          value={name}
					onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your email"
					value={email}
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
        // disabled={isSigningUp}
      >
         {/* {isSigningUp ? "Loading..." : "Register"} */}Register
      </button>
      <div className='text-center text-gray-400'>
						Already a member?{" "}
						<Link to={"/login"} className='text-red-500 hover:underline'>
							Sign in
						</Link>
			</div>
    </form>
    </div>
  );
};

export default Register;
