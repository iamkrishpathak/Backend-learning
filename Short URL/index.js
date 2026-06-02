const express = require("express");
const {connectToDb} = require("./connection");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

connectToDb("mongodb://localhost:27017/short-url").then(() => 
    console.log("MongoDB Connected Successfully!")
);

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, ()=>console.log(`Server Started at Port ${PORT} Successfully!`));
  