'use strict';

const mongoose = require('mongoose'),
  handler = require('../utils/index.js'),
  Task = mongoose.model('Tasks');

 exports.list_all_tasks = (req, res) => {
  Task.find({}, (err, task) => {
    handler.error_handlers(err, res);
    res.json(task);
  });
};

exports.create_a_task = (req, res) => {
  const new_task = new Task(req.body);
  new_task.save((err, task) => {
    handler.error_handlers(err, res);
    res.json(task);
  });
};

exports.read_a_task = (req, res) => {
  Task.findById(req.params.taskId, (err, task) => {
    handler.error_handlers(err, res);
    res.json(task);
  });
};

exports.update_a_task = (req, res) => {
  Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new: true}, (err, task) => {
    handler.error_handlers(err, res);
    res.json(task);
  });
};

exports.delete_a_task = (req, res) => {

  Task.remove({ _id: req.params.taskId }, (err, task) => {
    handler.error_handlers(err, res);
    res.json({ message: 'Task successfully deleted' });
  });
};
