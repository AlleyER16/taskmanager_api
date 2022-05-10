require("dotenv").config();

const express = require('express');
const app = express();


app.get("/", (req, res) => {
    res.json("Hell world");
});


const { users_router } = require("./routers");

app.use("api/v1/users", users_router);


const port = process.env.PORT || 3000;

const connectDB = require('./database/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`App listening at port ${port}: http://localhost:${port}/`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();