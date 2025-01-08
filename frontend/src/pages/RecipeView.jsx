import React, { useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const recipeData = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    ingredients: ["spaghetti", "eggs", "cheese", "bacon"],
    instructions:
      "Boil spaghetti. Cook bacon. Mix eggs and cheese. Combine all together.",
    cookingTime: "30 minutes",
  },
  {
    id: 2,
    name: "Chicken Curry",
    cuisine: "Indian",
    ingredients: ["chicken", "curry powder", "yogurt", "onion"],
    instructions: "Cook onions. Add chicken and spices. Simmer with yogurt.",
    cookingTime: "45 minutes",
  },
  {
    id: 3,
    name: "Sushi",
    cuisine: "Japanese",
    ingredients: ["rice", "fish", "seaweed"],
    instructions: "Cook rice. Slice fish. Roll rice and fish in seaweed.",
    cookingTime: "20 minutes",
  },
];

const RecipeView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  // Handle selecting a recipe
  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Handle deleting a recipe
  const handleDeleteRecipe = (id) => {
    const updatedRecipes = filteredRecipes.filter((recipe) => recipe.id !== id);
    setFilteredRecipes(updatedRecipes);
    setSelectedRecipe(null);
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
            <h2 className="text-2xl font-bold text-gray-800">Recipes</h2>

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
              {!selectedRecipe && (
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
                      <button
                        onClick={() => handleSelectRecipe(recipe)}
                        style={{ marginTop: "10px" }}
                      >
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {filteredRecipes.length === 0 && !selectedRecipe && (
                <p>No recipes found.</p>
              )}

              {/* Recipe Detail View */}
              {selectedRecipe && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "20px",
                  }}
                >
                  <h2>{selectedRecipe.name}</h2>
                  <p>
                    <strong>Cuisine:</strong> {selectedRecipe.cuisine}
                  </p>
                  <p>
                    <strong>Ingredients:</strong>{" "}
                    {selectedRecipe.ingredients.join(", ")}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {selectedRecipe.instructions}
                  </p>
                  <p>
                    <strong>Cooking Time:</strong> {selectedRecipe.cookingTime}
                  </p>
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    style={{ marginRight: "10px" }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(selectedRecipe.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
              )}
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

export default RecipeView;
