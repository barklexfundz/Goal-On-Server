require("dotenv").config(); 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require ("mongoose");
const cors = require('cors');
const goalRouter = require("./routes/goalRouter");

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => { 
    res.status(200).json({message: "Welcome to Goals API"});
});

// /api/goals
app.use ("/api/goals", goalRouter);

//error route 
app.use((req, res) => {
    res.status(404).json({message:'Resource Not Found'});
});

//data base connection and server listening mongoose


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {dbName: 'goalServer'})
        app.listen(PORT, ()=> {
            console.log(`Server running on port: ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();