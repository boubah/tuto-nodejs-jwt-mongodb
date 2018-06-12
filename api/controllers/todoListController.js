'use strict';

const mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

 exports.list_all_tasks = (req, res) => {
  Task.find()
    .then(task => res.json(task))
    .catch(err => res.send(err));
};

exports.create_a_task = (req, res) => {
  const new_task = new Task(req.body);
  new_task.save()
    .then(task => res.json(task))
    .catch(err => res.send(err))
};

exports.read_a_task = (req, res) => {
  Task.findById(req.params.taskId)
    .then(task => res.json(task))
    .catch(err => res.send(err));
};

exports.update_a_task = (req, res) => {
  Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new: true})
    .then(task => res.json(task))
    .catch(err => res.send(err));
};

exports.delete_a_task = (req, res) => {
  Task.remove({ _id: req.params.taskId })
    .then(() => res.json({ message: 'Task successfully deleted' }))
    .catch(err => res.send(err));
};
