import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-tasks"];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }

       // console.log("Token:", token);
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            console.log("Decoded token is invalid or missing userId:", decoded);
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

      //  console.log("Decoded Token:", decoded);

        const user = await User.findById(decoded.userId).select("-password");
        console.log("User:", user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
