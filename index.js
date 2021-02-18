const fs=require('fs');
const http=require('http');
const path= require('path');
const express=require('express');
const port=3000;
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true});
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
var schema=new mongoose.Schema({
    name:String,
    password:String
});
const idpassmodel=mongoose.model("idpassmodel",schema,"passwords");
server.get('/',(req,res)=>{
    console.log(req.url);
    console.log(req.body);
    res.render('login');
})
server.get('/signup',(req,res)=>{
    res.render('signup',{message:'null'});
})
server.post('/login',(req,res)=>{
   idpassmodel.find({name:req.body.id,password:req.body.pass}).exec((err,display)=>{
        if(err){
            res.redirect('/');
        }
        else{
            console.log(display);
            if(display.length==0)    res.redirect('/');
            else
            res.redirect('/home');
        }
   });
})
server.get('/contact.pug',(req,res)=>{
    console.log(req.url);
    res.render('contact');
})
server.post('/',(req,res)=>{
    var doc1=new idpassmodel({name:req.body.id,password:req.body.pass});
    doc1.save((err,doc)=>{
        if(err) return console.error(err);
        console.log("document successfully inserted");
    })
    console.log(req.body);
    res.render('login',{message:"user successfully created"});
})
server.get('/home',(req,res)=>{
    res.render('index');
})
server.listen(port,()=>{
    console.log(`server listening at ${port}`);
})
/*
    in mongo db a collection is a grouping of documents
    equivalent to a rdbms table while documents in a collection is like a row in rdbms table
    mongoose schema defines the structure of the document ,default values ,validators etc
    while mongoose model is a wrapper on the mongoose schema 
    a model is a class with which we can construct documents 
    const silence = new Kitten({ name: 'Silence' });
`   console.log(silence.name); // 'Silence'

    this is how we create a model 
    const kittySchema = new mongoose.Schema({
    name: String
    });
    now  
    const Kitten = mongoose.model('Kitten', kittySchema);
*/