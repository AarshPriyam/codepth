const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const { response } = require('express');
const { MongoURI } = require('./config/keys');

const app = express();

// ejs
app.use(expressLayouts);
app.set('view engine','ejs');

// Body parser
app.use(express.urlencoded({extended: false}));

// mongodb
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(MongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(response => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;


app.listen(PORT,console.log(`server started on ${PORT}`));