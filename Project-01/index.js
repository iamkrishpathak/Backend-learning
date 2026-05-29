const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json")

const user = express();
const PORT = 3000;

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

user.get('/users', (req,res)=>{
    const html = `<ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join('')};
    </ul>`
    res.send(html);
});

//REST APIS
user.get('/api/users',(req,res)=>{
    return res.json(users);
});

user.get('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json(user);
});

user.post('/api/users',(req,res)=>{
    const body = req.body; //create a body
    users.push({id: users.length + 1, ...body}); //in the users json file we push the body splited and also the id by user's length
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => { //now we process the database query, using fs module
        return res.json({status:"success",id:users.length});
    }) 
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
user.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json(user);
})

// .patch((req,res)=>{
//     //update a user with id
//     const body = req.body;
//     users.push({id:users.length,...body});
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
//         return res.json({status:"success",id:users.length});
//     })
// })

.patch((req,res)=>{
    //update a user with id
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    
    if(userIndex === -1) {
        return res.json({status:"error", message:"User not found"});
    }
    
    users[userIndex] = {...users[userIndex], ...body};
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status:"success", id: users[userIndex].id});
    })
})

.delete((req,res)=>{
    //delete a user with id
    return res.json({status:"pending"});
});

user.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));