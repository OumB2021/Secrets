require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email : String, 
  password : String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Home route
app.get('/', (req, res) =>{
  res.render('home')
});

//---------------------------------------------------------------------------------------------//
// Login route
app.route('/login')
.get((req, res) =>{
  res.render('login')
})

.post((req, res) =>{
  
});

//---------------------------------------------------------------------------------------------//
// Register route 
app.route('/register')

.get((req, res) =>{
  res.render('register')
})

.post((req, res) =>{
  
  User.register({username: req.body.username}, req.body.password, (err, user) =>{
    if (err){
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, ()=>{
        res.redirect('/secrets');
      })
    }
  })
})

//---------------------------------------------------------------------------------------------//
//secrets route
app.get('/secrets', (req, res) => {
  res.render('secrets');
});

//---------------------------------------------------------------------------------------------//

// submit route
app.get('/submit', (req, res) =>{
  res.render('submit')
});

app.listen (3000, () => {
  console.log('listening on port 3000');
})