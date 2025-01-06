import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("mongoDB Connected:"+ conn.connection.host)
    }catch(e){
        console.log("Error connecting to Mongodb: "+e.message)
        process.exit(1)
    }
}