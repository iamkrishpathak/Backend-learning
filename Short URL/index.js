const express = require("express");
const {connectToDb} = require("./connection");
const path = require("path");
const urlRoute = require("./routes/url");
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

app.use(express.json());

app.get("/test", async (req,res) => {
    const allUrls = await URL.find({});
    return res.render("home",{
        urls : allUrls
    });
});

app.use("/url", urlRoute);

app.get("/url/:shortId", async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId : shortId
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