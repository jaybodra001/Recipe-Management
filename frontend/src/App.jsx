import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeListing from "./pages/RecipeListing";
import RecipeView from "./pages/RecipeView";
import RecipeForm from "./pages/RecipeForm";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<RecipeListing />} />
        <Route path="/view" element={<RecipeView />} />
        <Route path="/form" element={<RecipeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
