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

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email : String, 
  password : String
});

const User = new mongoose.model('User', userSchema);


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
  
})

//---------------------------------------------------------------------------------------------//

// submit route
app.get('/submit', (req, res) =>{
  res.render('submit')
});

app.listen (3000, () => {
  console.log('listening on port 3000');
})