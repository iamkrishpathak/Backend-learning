const express = require("express");

const {connectMongoDb} = require("./connection");

const {logReqRes} = require("./middlewares");

const userRouter = require("./routes/user");

const user = express();
const PORT = 3000;

//Connection with Mongoose
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(()=>console.log("MongoDB Connected Successfully!"))
    .catch(() => console.log("Connection failed!"));

//MIDDLEWARES - Plugins
user.use(express.urlencoded({extended:false}));
user.use(logReqRes("log.txt"));


//Routes
user.use("/api/users", userRouter);

user.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));