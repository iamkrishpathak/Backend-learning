const express = require("express");

const {handleGetAllUsers, handlegetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser} = require("../controllers/user");

const router = express.Router();

//ROUTES

// router.get('/', async(req,res)=>{
//     //this means bring up all the users
//     const allDbUsers = await User.find({})
//     const html = `<ul>
//         ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email} </li>`).join('')};
//     </ul>`
//     res.send(html);
// });

//REST APIS
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router.route('/:id')
    .get(handlegetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

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

module.exports = router;