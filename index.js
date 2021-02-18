const fs=require('fs');
const http=require('http');
const path= require('path');
const express=require('express');
const port=3000;
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log( `we're connected`);
});
const server=express();
server.set('view engine', 'pug');
server.set('views',path.join(__dirname,'views'));
server.use(express.static('static'));
server.use(express.urlencoded());
server.get('/',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    res.render('login');
})
server.get('/signup',(req,res)=>{
    res.render('signup',{message:'null'});
})
server.post('/',(req,res)=>{
    console.log(req.body);
})
server.get('/contact.pug',(req,res)=>{
    console.log(req.url);
    res.render('contact');
})
server.post('/home',(req,res)=>{
    console.log(req.body);
    res.send("home");
})
server.listen(port,()=>{
    console.log(`server listening at ${port}`);
})
