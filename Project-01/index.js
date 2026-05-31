const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const user = express();
const PORT = 3000;

//Connection with Mongoose
mongoose
    .connect('mongodb://127.0.0.1:27017/youtube-app-1')
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(` Mongo Error ${err}`));

//Schema
const userSchema =  new mongoose.Schema({
    firstName:{
        required : true,
        type: String,
    },
    lastName: {
        type: String,
    },
    gender:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type:String,
    }
}, {timestamps : true});

const User = mongoose.model('user', userSchema);
//here model is named as "user", so collection name will be same as it but in plural, so collections name --> "users"

//MIDDLEWARES - Plugins
user.use(express.urlencoded({extended:false}));

user.use((req,res,next)=>{
    fs.appendFile("log.txt", `${Date.now()} -- ${req.ip} : ${req.method} --> ${req.path}\n`, (err,data)=>{
        next();
    });
});

user.use((req,res,next)=>{
    console.log("Hello from MIDDLEWARE");
    // return res.json({"USER" : "Krish"});
    next();
});

//ROUTES

user.get('/users', async(req,res)=>{
    //this means bring up all the users
    const allDbUsers = await User.find({})
    const html = `<ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email} </li>`).join('')};
    </ul>`
    res.send(html);
});

//REST APIS
user.get('/api/users',async (req,res)=>{
    const allDbUsers = await User.find({});

    res.setHeader("X-MyName", "Krish Pathak"); //custom headers
    //always add X to custom headers - it is not compulsory but general practice
    return res.json(allDbUsers);
});

user.get('/api/users/:id', async (req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error : "User not found!"});
    return res.json(user);
});

user.post('/api/users',async(req,res)=>{
    const body = req.body; //create a body
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg:"All fields are required"});
    }
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        gender : body.gender,
        jobTitle : body.job_title,
        email : body.email,
    });
    return res.status(201).json({msg:"success!"});
});

user.patch('/api/users/:id', async (req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, {lastName : "Indian"});
    return res.json({
        status : "Success!"
    });
});

//NORMAL NON-MERGED METHOD for PATCH and DELETE
/*
user.patch('/api/users/:id',(req,res)=>{
    //TODO : update a user with id
});

user.delete('/api/users/:id',(req,res)=>{
    //TODO : delete a user with id
});
*/

//We can also merge the requests
// user.route('/api/users/:id')
// .get((req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id == id);
//     if(!user) return res.status(404).json({error : "User not found!"});
//     return res.json(user);
// })

// .patch((req,res)=>{
//     //update a user with id
//     const body = req.body;
//     users.push({id:users.length,...body});
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
//         return res.json({status:"success",id:users.length});
//     })
// })

// .patch((req,res)=>{
//     //update a user with id
//     const id = Number(req.params.id);
//     const body = req.body;
//     const userIndex = users.findIndex((user) => user.id === id);
    
//     if(userIndex === -1) {
//         return res.json({status:"error", message:"User not found"});
//     }
    
//     users[userIndex] = {...users[userIndex], ...body};
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
//         return res.json({status:"success", id: users[userIndex].id});
//     })
// })

// .delete((req,res)=>{
//     //delete a user with id
//     return res.json({status:"pending"});
// });

user.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));