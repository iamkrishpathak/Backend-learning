const file = require("fs");
const os = require("os");

// console.log(os.cpus().length);

//this fs module is built-in

//sync...
// file.writeFileSync('./test1.js','//Hey this is newly created JS file');

//async...
// file.writeFile('./test1.js','//Hey this is newly created JS file', (err) => {});

//read sync..

// const resultingFileData = file.readFileSync('./contacts.txt','utf-8');
// console.log(resultingFileData);

//read normal
// file.readFile('./contacts.txt',"utf-8", (err, result) => {
//     if (err){
//         console.log("Error: ", err);
//     }
//     else{
//         console.log(result);
//     }
// });

//append...
// file.appendFileSync('./contacts.txt','\nRahul : +91 888823232');

//copying
// file.cpSync('contacts.txt','recentContacts.txt');

//deleting or unlinking
// file.unlinkSync('./recentContacts.txt');

//status
// console.log(file.statSync('contacts.txt'));