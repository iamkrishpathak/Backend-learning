const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()} : ${req.method} METHOD, This is accesss time of client for ${req.url} page\n`;
    const my_url = url.parse(req.url);
    fs.appendFile("./log.txt", log, (err,data) => {
        switch(my_url.pathname){
            case "/":
                if (req.method === 'GET') res.end("homepage");
                break;
            case "/about":
                const username = my_url.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case "/search":
                const search = my_url.query.search_query;
                res.end(`Here are your results for ${search}`);
                break;
            case "/signup":
                if(req.method === 'GET') req.end("This is a signup form!");
                else if(req.method === 'POST') {
                    //DB QUERY
                    req.end("Sucessful");
                }
            default:
                res.end("Error 404");
        }
    });

});

server.listen(8000, () => console.log("Hey server succesful!"));

