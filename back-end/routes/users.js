const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../models/User');

/** /test
 *  tests if routes in /users are functional
 */
router.get('/test', (req, res) => {
  console.log("User Routes are functional");
  res.send("User Routes are functional");
});

/** /submit
 *  Submit a Site User.
 */
router.post('/submituser', (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;

  if (!name) res.json({
    status: false,
    message: "No name included."
  });

  if (!email) res.json({
    status: false,
    message: "No email address included."
  });

  if (!password) res.json({
    status: false,
    message: "No password 1 included."
  });

  if (!password2) res.json({
    status: false,
    message: "No password 2 included."
  });

  if (password != password2) res.json({
    status: false,
    message: "Passwords do not match"
  });

  if (password.length < 6) res.json({
    status: false,
    message: "Password must be at least 6 chars."
  });

  User.findOne({
    email: email
  }).then(user => {
    if (user) {
      res.json({
        status: false,
        message: `The account ${email} is already registered`
      });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        if(err === null){
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err === null) {
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  console.log(`Log Info: \n ${user}`);
                  res.json({
                    status: true,
                    message: `The account ${email} was registered`
                  });
                })
                .catch(err => console.log(err));
            } else res.json({
              status: false,
              message: "Login Unsuccessful. Error generating password."
            });
          });
        } else res.json({
          status: false,
          message: "Login Unsuccessful. Error generating password."
        });
      });
    }
  });
});


/** /login
 *  The route to log a user in.
 */
router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body
  User.find({
    email: sanitize(email)
  }).then(userinfo => {
    const username = userinfo[0].name;
    const email = userinfo[0].email;
    const userpassword = userinfo[0].password;
    bcrypt.compare(password, userpassword, function (err, result) {
      if (err === null) {
        if (result === true) {
          const user = {
            username: username,
            email: email
          };
          jwt.sign({
            user
          }, 'secretkey', {
            expiresIn: '6000s'
          }, (err, token) => {
            if (err === null) res.json({
              status: true,
              message: "Login Successful",
              token: token
            });
            else res.json({
              status: false,
              message: "Error generating security token."
            });
          });
        } else res.json({
          status: false,
          message: "Login Unsuccessful. Password or e-mail not in database."
        });
      } else res.json({
        status: false,
        message: "Error validating password."
      });
    });
  });
});

/** /logout
 *  The route to log a user out.
 */
router.get('/logout', (req, res) => {
  res.json({
    status: true,
    message: `Logged out ${req.body.email}.`,
    username: null,
    logstatus: `login`
  });
});

module.exports = router;