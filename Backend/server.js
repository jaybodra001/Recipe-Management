import express from "express";

const app = express()

app.get('/',(req, res)=>{
    res.send("Server is resdy ")
})

app.listen(2002,() => {
    console.log("Server is running on http://localhost:2002")
})