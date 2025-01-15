import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./config/db.js";
import { ENV_VARS } from "./config/envVars.js";
import authRoutes from "./routes/auth.route.js"

const app = express()

const PORT = ENV_VARS.PORT

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth",authRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });

app.listen(PORT,() => {
    console.log("Server is running on http://localhost:"+PORT)
    connectDB()
})