const express = require("express");
const {connectToDb} = require("./connection");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const URL = require("./models/url");
const { url } = require("inspector");

const app = express();
const PORT = 8001;

connectToDb("mongodb://localhost:27017/short-url").then(() => 
    console.log("MongoDB Connected Successfully!")
);

//telling server that yes it's ejs, also locating it
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

//it is used to tell express that we will use json as well as urlFormData
app.use(express.json());
app.use(express.urlencoded( {extended: false}));

app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID : shortId
    },
    {
        $push: {
            visitHistory: {
                timestamp : Date.now(),
            }
        },
    }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=>console.log(`Server Started at Port ${PORT} Successfully!`));