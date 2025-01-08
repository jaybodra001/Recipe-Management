import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authUser";

const RecipeView = () => {
  const { recipes, fetchRecipes, isFetchingRecipes, deleteRecipe, editRecipe, user, authCheck } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipeData, setEditedRecipeData] = useState({
    name: "",
    cuisine: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
  });

  useEffect(() => {
    if (!user) {
      authCheck();
    } else if (!isFetchingRecipes && recipes.length === 0) {
      fetchRecipes();
    }
  }, [user, isFetchingRecipes, recipes, authCheck, fetchRecipes]);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.cuisine.toLowerCase().includes(term) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(term)
        )
    );

    setFilteredRecipes(filtered);
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditing(false);
    setEditedRecipeData({
      name: recipe.name,
      cuisine: recipe.cuisine,
      ingredients: recipe.ingredients.join(", "),
      instructions: recipe.instructions,
      cookingTime: recipe.cookingTime,
    });
  };

  const handleDeleteRecipe = async (id) => {
    await deleteRecipe(id);
    setSelectedRecipe(null);
  };

  const handleEditRecipe = async () => {
    const updatedData = {
      name: editedRecipeData.name,
      cuisine: editedRecipeData.cuisine,
      ingredients: editedRecipeData.ingredients.split(",").map((ingredient) => ingredient.trim()),
      instructions: editedRecipeData.instructions,
      cookingTime: editedRecipeData.cookingTime,
    };
    await editRecipe(selectedRecipe._id, updatedData);
    setIsEditing(false);
    setSelectedRecipe({ ...selectedRecipe, ...updatedData });
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-6">Recipes</h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by ingredient or cuisine..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Recipe List */}
            {!selectedRecipe && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">{recipe.name}</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Cuisine:</strong> {recipe.cuisine}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                    </p>
                    <button
                      onClick={() => handleSelectRecipe(recipe)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}

            {filteredRecipes.length === 0 && !selectedRecipe && (
              <p className="text-gray-500">No recipes found.</p>
            )}

            {/* Recipe Detail View */}
            {selectedRecipe && !isEditing && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">{selectedRecipe.name}</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Cuisine:</strong> {selectedRecipe.cuisine}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Ingredients:</strong> {selectedRecipe.ingredients.join(", ")}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Instructions:</strong> {selectedRecipe.instructions}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Cooking Time:</strong> {selectedRecipe.cookingTime}
                </p>
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(selectedRecipe._id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>

                {/* Back to Recipe Button */}
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  Back to Recipes
                </button>
              </div>
            )}

            {/* Edit Recipe Form */}
            {isEditing && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">Edit Recipe</h3>
                <input
                  type="text"
                  value={editedRecipeData.name}
                  onChange={(e) => setEditedRecipeData({ ...editedRecipeData, name: e.target.value })}
                  placeholder="Recipe Name"
                  className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={editedRecipeData.cuisine}
                  onChange={(e) => setEditedRecipeData({ ...editedRecipeData, cuisine: e.target.value })}
                  placeholder="Cuisine"
                  className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={editedRecipeData.ingredients}
                  onChange={(e) => setEditedRecipeData({ ...editedRecipeData, ingredients: e.target.value })}
                  placeholder="Ingredients (comma separated)"
                  className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={editedRecipeData.instructions}
                  onChange={(e) => setEditedRecipeData({ ...editedRecipeData, instructions: e.target.value })}
                  placeholder="Instructions"
                  className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={editedRecipeData.cookingTime}
                  onChange={(e) => setEditedRecipeData({ ...editedRecipeData, cookingTime: e.target.value })}
                  placeholder="Cooking Time"
                  className="w-full p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={handleEditRecipe}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  Back to Details
                </button>
              </div>
            )}
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
