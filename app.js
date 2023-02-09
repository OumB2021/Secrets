const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {useNewUrlParser: true});

//Home route
app.get('/', (req, res) =>{
  res.render('home')
});

// Login route
app.get('/login', (req, res) =>{
  res.render('login')
});

// Register route
app.get('/register', (req, res) =>{
  res.render('register')
});

// Secret route
app.get('/secrets', (req, res) =>{
  res.render('secrets')
});

// submit route
app.get('/submit', (req, res) =>{
  res.render('submit')
});

app.listen (3000, () => {
  console.log('listening on port 3000');
})