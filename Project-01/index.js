const express = require("express");
const users = require("./MOCK_DATA.json")

const user = express();
const PORT = 3000;


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
    //TODO : add the user
});

// user.patch('/api/users/:id',(req,res)=>{
//     //TODO : update a user with id
// });

// user.delete('/api/users/:id',(req,res)=>{
//     //TODO : delete a user with id
// });

//We can also merge the requests
user.route('/api/users/:id')
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json(user);
})
.patch((req,res)=>{
    //update a user with id
    return res.json({status:pending});
})
.delete((req,res)=>{
    //delete a user with id
    return res.json({status:pending});
});

user.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));