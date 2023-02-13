require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const saltRounds = 10;

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
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email :username}, function(err, userFound){
    if (err){
      console.log(err);
    } else {
      if (userFound){
        console.log (userFound.password);
        
        bcrypt.compare(password, userFound.password, (err, result) =>{
          if (result === true){
            res.render('secrets')
          }
        });
      }
    }
  })
});

//---------------------------------------------------------------------------------------------//
// Register route 
app.route('/register')

.get((req, res) =>{
  res.render('register')
})

.post((req, res) =>{

  bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{

    const newUser = new User({
      email : req.body.username,
      password: hash,
    });
    
    newUser.save((err) =>{
      if (!err) {
        res.render('secrets');
      } else {
        console.log (err.message);
      }
    });

  })
  
})

//---------------------------------------------------------------------------------------------//

// submit route
app.get('/submit', (req, res) =>{
  res.render('submit')
});

app.listen (3000, () => {
  console.log('listening on port 3000');
})