const http=require('http');
var fs=require('fs');

const hostname='127.0.0.1';
const port=3000;
const home=fs.readFileSync('views/index.html');
const server=http.createServer((req,res)=>{
    res.statusCode=200;
    console.log(req.url);
    if(req.url=='/css/styles.css'){
        res.setHeader('Content-Type','text/css');
        const styles=fs.readFileSync('css/styles.css');
        res.end(styles);
        return; 
    }
    if(req.url=='/css/utils.css'){
        res.setHeader('Content-Type','text/css');
        const styles=fs.readFileSync('css/utils.css');
        res.end(styles);
        return;
    }
    if(req.url=='/img/home.jpg'){
        res.setHeader('Content-Type','image/jpg');
        res.end(fs.readFileSync('img/home.jpg'))
    }
    if(req.url=='/img/home1.svg'){
        res.setHeader('Content-Type','image/svg+xml');
        res.end(fs.readFileSync('img/home1.svg'))
    }
    if(req.url=='/'){
    res.setHeader('Content-Type','text/html');
    res.end(home);
    }
})
server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);
});