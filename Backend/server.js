import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/auth.route.js"

const app = express()

const PORT = ENV_VARS.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth",authRoutes)

app.listen(PORT,() => {
    console.log("Server is running on http://localhost:"+PORT)
    connectDB()
})