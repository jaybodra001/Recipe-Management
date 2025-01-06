import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// Sample data for recipes
const recipeData = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    ingredients: ["spaghetti", "eggs", "cheese", "bacon"],
  },
  {
    id: 2,
    name: "Chicken Curry",
    cuisine: "Indian",
    ingredients: ["chicken", "curry powder", "yogurt", "onion"],
  },
  {
    id: 3,
    name: "Sushi",
    cuisine: "Japanese",
    ingredients: ["rice", "fish", "seaweed"],
  },
];

const RecipeListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = recipeData.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.cuisine.toLowerCase().includes(term) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(term)
        )
    );

    setFilteredRecipes(filtered);
  };

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
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Listing</h2>
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by ingredient or cuisine..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />

              {/* Recipe List */}
              <ul style={{ listStyle: "none", padding: 0 }}>
                {filteredRecipes.map((recipe) => (
                  <li
                    key={recipe.id}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      padding: "15px",
                    }}
                  >
                    <h2>{recipe.name}</h2>
                    <p>
                      <strong>Cuisine:</strong> {recipe.cuisine}
                    </p>
                    <p>
                      <strong>Ingredients:</strong>{" "}
                      {recipe.ingredients.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>

              {filteredRecipes.length === 0 && <p>No recipes found.</p>}
            </div>
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

export default RecipeListing;
