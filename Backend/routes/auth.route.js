import express from 'express'
import { authCheck, changePassword, signup, updateProfile } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { logout } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)    
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile);

router.put("/change-password", protectRoute, changePassword);

router.get("/authCheck", protectRoute, authCheck)

export default router;

