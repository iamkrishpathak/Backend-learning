const http = require("http");
const express = require("express");

const app = express();

app.get('/',(req,res)=>{
    return res.send("This is krish from homepage!");
});

app.get('/about',(req,res)=>{
    return res.send(`Hi, ${req.query.name}`);
});
app.listen(8000, (req,res) => console.log("Server started!"));