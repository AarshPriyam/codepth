const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// user module
const User = require('../models/User');

// login page
router.get('/login', (req, res) => res.render('login'));

// register page
router.get('/register', (req, res) => res.render('register'));

// register handle
// Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    } 

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
           
                    bcrypt.genSalt(10,(err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg','you are now registered can log in');
                                    res.redirect('/users/login');
                                });
                            });
                    });
                }
            });
        }


});
module.exports = router;