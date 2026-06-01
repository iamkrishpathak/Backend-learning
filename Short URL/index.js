const express = require("express");
const {connectToDb} = require("./connection");
const urlRoutes = require("./routes/url");

const app = express();
const PORT = 8001;

connectToDb("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(() => console.log("Connection Failed!"));

app.use("/url", urlRoutes);

app.listen(PORT, ()=>console.log(`Server Started at Port ${PORT} Successfully!`));
