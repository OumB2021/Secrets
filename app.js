const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const ecrypt = require ('mongoose-encryption');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {useNewUrlParser: true});

const userSchema = {
  email : String, 
  password : String
};

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

  User.findOne({email: username}, (err, user) =>{
    if (err) {
      res.send("This user does not exist");
      res.redirect('/login');
    } else {
      if(user){
        if (user.password === password) {
          res.render('secrets');
        }
      }
    }
  });
});

//---------------------------------------------------------------------------------------------//
// Register route 
app.route('/register')

.get((req, res) =>{
  res.render('register')
})

.post((req, res) =>{

  const newUser = new User({
    email : req.body.username,
    password: req.body.password,
  });
  
  newUser.save((err) =>{
    if (!err) {
      res.render('secrets');
    } else {
      console.log (err.message);
    }
  });
})

//---------------------------------------------------------------------------------------------//

// submit route
app.get('/submit', (req, res) =>{
  res.render('submit')
});

app.listen (3000, () => {
  console.log('listening on port 3000');
})