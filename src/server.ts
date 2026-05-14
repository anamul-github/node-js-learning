import { createServer, IncomingMessage, Server } from "http";

const server : Server = createServer((req : IncomingMessage ,res) => {
    //console.log(req.url); // '/' , '/user', '/products'
    //console.log(req.method); // "GET" , "POST" , "DELETE"

    const url = req.url
    const method = req.method

    if(url === '/' && method === "GET") {
        //console.log("This is Root route");
        res.writeHead(200, { "content-type" : "application/json"});
        res.end(JSON.stringify({message: "This is root route"}));
    } else if(url?.startsWith('/products')) {
        res.writeHead(200, { "content-type" : "application/json"});
        res.end(JSON.stringify({message: "This is products route"}));
    } else {
        res.writeHead(404, { "content-type" : "application/json"});
        res.end(JSON.stringify({message: "Route Not Found"}));
    }
});

server.listen(5001, () =>{
    console.log("Server is running on the port 5001");
});