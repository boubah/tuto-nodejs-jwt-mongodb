'use strict';

const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');

exports.register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save()
      .then(user => {
        user.hash_password = undefined;
        return res.json(user);
      }).catch(err => res.status(400).send({ message: err }));
};

exports.sign_in = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') })
    }).catch(err => {throw err});
};

exports.loginRequired = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized user!' }); 
  } 
  next();
};
