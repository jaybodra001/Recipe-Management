import { User } from "../models/user.model.js";
import { Recipe } from "../models/recipe.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are reuired!!!" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address!!!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!!!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!!!" });
  } catch (e) {
    console.log("Error in SignUp controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const existingUserByEmail = await User.findOne({ email: email });
    if (!existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist!!!" });
    }
    const isValidPassword = await bcryptjs.compare(
      password,
      existingUserByEmail.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password!!!" });
    }
    generateTokenAndSetCookie(existingUserByEmail._id, res);

    res.status(200).json({ success: true, message: "Login successful!!!" });
  } catch (e) {
    console.log("Error in Login controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-recipe");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!!!" });
  } catch (e) {
    console.log("Error in Logout controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
}

export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function createRecipe(req, res) {
  try {
    const { name, cuisine, ingredients, instructions, cookingTime } = req.body;
    const userId = req.user._id; // Assuming user info is available in `req.user`

    if (!name || !cuisine || !ingredients || !instructions || !cookingTime) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const newRecipe = new Recipe({
      name,
      cuisine,
      ingredients,
      instructions,
      cookingTime,
      userId,
    });

    await newRecipe.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Recipe created successfully!",
        recipe: newRecipe,
      });
  } catch (error) {
    console.error("Error in createRecipe controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Get All Recipes
export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find({ userId: req.user._id }); // Fetch only the user's recipes
    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.error("Error in getRecipes controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Get Recipe by ID
export async function getRecipeById(req, res) {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ _id: id, userId: req.user._id });

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found!" });
    }

    res.status(200).json({ success: true, recipe });
  } catch (error) {
    console.error("Error in getRecipeById controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Update Recipe
export async function updateRecipe(req, res) {
  try {
    const { id } = req.params;
    const { name, cuisine, ingredients, instructions, cookingTime } = req.body;

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // Ensure the user owns the recipe
      { name, cuisine, ingredients, instructions, cookingTime },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Recipe not found or not authorized to update!",
        });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Recipe updated successfully!",
        recipe: updatedRecipe,
      });
  } catch (error) {
    console.error("Error in updateRecipe controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Delete Recipe
export async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;

    const deletedRecipe = await Recipe.findOneAndDelete({
      _id: id,
      userId: req.user._id, // Ensure the user owns the recipe
    });

    if (!deletedRecipe) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Recipe not found or not authorized to delete!",
        });
    }

    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteRecipe controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}
