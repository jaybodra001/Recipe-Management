import express from 'express'
import { authCheck, createRecipe, deleteRecipe, getRecipes, signup, updateRecipe } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { logout } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)    
router.post("/logout", logout)

router.get("/recipe", protectRoute, getRecipes)
router.put("/recipe/:id", protectRoute, updateRecipe)
router.delete("/recipe/:id", protectRoute, deleteRecipe)
router.post("/recipe", protectRoute, createRecipe)

router.get("/authCheck", protectRoute, authCheck)

export default router;

