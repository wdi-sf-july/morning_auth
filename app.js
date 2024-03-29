var express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  db = require("./models/index");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) ); 

app.get('/', function(req,res){
	res.render("index", {message: null});
});

app.get('/signup', function(req,res){
  res.render("signup", {message: null, username: ""});
});

app.get('/login', function(req,res){
  res.render("login", {message: null, username: ""});
});

app.get('/home', function(req,res){
  res.render("home");
});
// on submit, create a new users using form values
app.post('/create', function(req,res){	
   
  db.user.createNewUser(req.body.username, req.body.password, 
  function(err){
    res.render("signup", {message: err.message, username: req.body.username});
  }, 
  function(success){
    res.render("index", {message: success.message});
  });
});

// authenticate users when logging in
app.post('/login', function(req,res){

  db.user.authorize(req.body.username, req.body.password, 
  function(err){
    res.render("login", {message: err.message, username: req.body.username});
  }, 
  function(success){
    res.redirect("home");
  });
});

app.listen(3000, function(){
  console.log("get this party started on port 3000");  
});


