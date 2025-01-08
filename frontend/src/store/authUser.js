import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  recipes: [],
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isCreatingRecipe: false,
  isEditingRecipe: false,
  isDeletingRecipe: false,
  isFetchingRecipes: false,

  // Signup
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  // Login
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  // Logout
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  // Auth Check
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },

  // Fetch Recipes
  fetchRecipes: async () => {
    set({ isFetchingRecipes: true });
    try {
      const response = await axios.get("/api/v1/auth/recipe");
      set({ recipes: response.data.recipes, isFetchingRecipes: false });
    } catch (error) {
      set({ isFetchingRecipes: false });
      toast.error(error.response.data.message || "Failed to fetch recipes");
    }
  },

  // Create Recipe
  createRecipe: async (recipeData) => {
    set({ isCreatingRecipe: true });
    try {
      const response = await axios.post("/api/v1/auth/recipe", recipeData);
      set((state) => ({
        recipes: [...state.recipes, response.data.recipe],
        isCreatingRecipe: false,
      }));
      toast.success("Recipe created successfully");
    } catch (error) {
      set({ isCreatingRecipe: false });
      toast.error(error.response.data.message || "Failed to create recipe");
    }
  },

  // Edit Recipe
  editRecipe: async (id, updatedData) => {
    set({ isEditingRecipe: true });
    try {
      const response = await axios.put(`/api/v1/auth/recipe/${id}`, updatedData);
      set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe._id === id ? response.data.recipe : recipe
        ),
        isEditingRecipe: false,
      }));
      toast.success("Recipe updated successfully");
    } catch (error) {
      set({ isEditingRecipe: false });
      toast.error(error.response.data.message || "Failed to update recipe");
    }
  },

  // Delete Recipe
  deleteRecipe: async (id) => {
    set({ isDeletingRecipe: true });
    try {
      await axios.delete(`/api/v1/auth/recipe/${id}`);
      set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe._id !== id),
        isDeletingRecipe: false,
      }));
      toast.success("Recipe deleted successfully");
    } catch (error) {
      set({ isDeletingRecipe: false });
      toast.error(error.response.data.message || "Failed to delete recipe");
    }
  },
}));
