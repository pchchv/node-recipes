const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
let pass = fs.readFileSync("login.txt", "utf8").split(' ');
const dbURI = `mongodb+srv://${pass[0]}:${pass[1]}@nodetuts.ufztg.mongodb.net/node-auth?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));