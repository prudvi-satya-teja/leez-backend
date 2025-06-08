const express = require("express");
require("dotenv").config();

const { connectToDB } = require("./config/connection");

connectToDB(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection error : ", err);
    });

const app = express();

const port = 5001;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
 

   