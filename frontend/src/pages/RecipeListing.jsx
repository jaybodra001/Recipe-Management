import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for error messages
import { useAuthStore } from "../store/authUser"; // Accessing Zustand store

const RecipeListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Accessing recipes and fetching state from the store
  const { recipes, isFetchingRecipes, fetchRecipes } = useAuthStore();

  // Fetch recipes on component mount
  useEffect(() => {
    if (recipes.length === 0) {
      fetchRecipes(); // Fetch recipes if they are not already loaded
    }
  }, [fetchRecipes, recipes.length]);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  
    console.log("Search Term:", term); // Log the search term
  
    // Filter recipes based on search term
    const filtered = recipes.filter((recipe) => {
      const recipeName = recipe.name.toLowerCase();
      const recipeCuisine = recipe.cuisine.toLowerCase();
      const recipeIngredients = recipe.ingredients
        .map((ingredient) => ingredient.toLowerCase())
        .join(", "); // Join ingredients to search them together
  
      // Log the filtering process to see if it's working
      console.log("Filtering Recipe:", recipe.name);
      console.log("Name Match:", recipeName.includes(term));
      console.log("Cuisine Match:", recipeCuisine.includes(term));
      console.log("Ingredients Match:", recipeIngredients.includes(term));
  
      return (
        recipeName.includes(term) ||
        recipeCuisine.includes(term) ||
        recipeIngredients.includes(term)
      );
    });
  
    console.log("Filtered Recipes:", filtered); // Log the filtered recipes
  
    setFilteredRecipes(filtered); // Update filtered recipes based on search term
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

              {/* Loading state */}
              {isFetchingRecipes && <p>Loading recipes...</p>}

              {/* Recipe List */}
              <ul style={{ listStyle: "none", padding: 0 }}>
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => (
                    <li
                      key={recipe._id} // Use _id instead of id
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
                  ))
                ) : (
                  <p>No recipes found.</p>
                )}
              </ul>
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
