'use strict';

const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  Promise = require('bluebird'),
  mongoose = Promise.promisifyAll(require('mongoose')),
  Task = require('./api/models/todoListModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');
  
  
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/Tododb', {
  useMongoClient: true
}).then(() => {
  console.log('Connecté à la base mongodb');
}).catch(err => {
  console.log('Error lors du demarrage: ', err.stack);
  process.exit(1);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require('./api/utils/index.js');
app.use(jwt.json_web_token_handler);
const routes = require('./api/routes/todoListRoutes');
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

module.exports = app;