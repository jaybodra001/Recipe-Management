import { useEffect } from "react";
import { useAuthStore } from "./store/authUser";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RecipeListing from "./pages/RecipeListing";
import RecipeView from "./pages/RecipeView";
import RecipeForm from "./pages/RecipeForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

function App() {
  const { user, authCheck } = useAuthStore();
  console.log('user is here',user)

  useEffect(() => {
		authCheck();
	}, [authCheck]);
  return (
    <Router>
      <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to ={"/login"} />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to ={"/"} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to ={"/"} />} />
      <Route path="/list" element={user ? <RecipeListing /> : <Navigate to ={"/login"} />} />
      <Route path="/view" element={user ? <RecipeView /> : <Navigate to ={"/login"} />} />
      <Route path="/form" element={user ? <RecipeForm /> : <Navigate to ={"/login"} />} />

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
