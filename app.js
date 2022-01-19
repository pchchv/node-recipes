const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
let pass = fs.readFileSync("login.txt", "utf8").split(' ');
const dbURI = `mongodb+srv://${pass[0]}:${pass[1]}@nodetuts.ufztg.mongodb.net/${pass[2]}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 86400000, httpOnly: true }); // maxAge 24 hours
  res.send('you got the cookies');
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});