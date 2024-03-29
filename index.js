const fs=require('fs');
const http=require('http');
const path= require('path');
const express=require('express');
const port=80;
const mongoose =require('mongoose');
mongoose.connect("mongodb+srv://adarsh-admin:AoUJo2luTwjrCDHv@cluster0.jjs5s.mongodb.net/blog", {useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log( `we're connected`);
// });
const server=express();
const session=require('express-session');
server.set('view engine', 'pug');
server.set('views',path.join(__dirname,'views'));
server.use(express.static('static'));
server.use(
    session({
        secret:"key that will sign cookie",
        resave:false,
        saveUninitialized:false
    })
);
server.use(express.urlencoded());
var schema=new mongoose.Schema({
    name:String,
    password:String
});
var schemaEachuser=new mongoose.Schema({
    title:String,
    content:String
})
var schemaFordata=new mongoose.Schema({
    user:[schemaEachuser]
});
const idpassmodel=mongoose.model("idpassmodel",schema,"passwords");
const dataModel=mongoose.model("dataModel",schemaFordata,"data");

server.get('/',(req,res)=>{
    console.log(req.session);
    res.render('login');
})
server.get('/signup',(req,res)=>{
   let message="";
  // console.log(req.query.id);
     idpassmodel.exists({name:req.query.id}, function(err,result){
            if(result===true){
                //console.log("before");
                message="id already exists";
                if(req.query.pass!==req.query.pass1){
                    message="passwords dont match";
                }
            }
            res.render('signup',{message:message});
    });
    //console.log("after");
})
server.post('/login',(req,res)=>{ 
   idpassmodel.find({name:req.body.id,password:req.body.pass}).exec((err,display)=>{
        if(err){
            res.redirect('/');
        }
        else{
            if(display.length==0)    res.redirect('/ ');
            else
            res.redirect('/home');
        }
   });
})
server.get('/contact.pug',(req,res)=>{
    console.log(req.url);
    res.render('contact');
})
server.post('/',async(req,res)=>{
    
    let user=await idpassmodel.findOne({name:req.body.id});
    if(user){
        return res.render('signup',{message:"username already exists"});
    }
    var doc1=new idpassmodel({name:req.body.id,password:req.body.pass});
    doc1.save((err,doc)=>{
        if(err) return console.error(err);
        console.log("document successfully inserted");
    })
    res.render('login',{message:"user successfully created"});
})
server.get('/home',(req,res)=>{
    console.log("test");
    console.log(req.query);
    res.render('index');
})
server.get('/createBlog',(req,res)=>{
    res.render('createBlog');
})

server.listen(process.env.PORT || 80,'0.0.0.0');
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

/*

first create createBlog page  

*/