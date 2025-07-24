// routes/tasks.js
const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');

router.post('/', (req, res) => {
  const { task_str_id, description, estimated_time_minutes } = req.body;
  if (!task_str_id || !description || estimated_time_minutes <= 0) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const task = taskModel.createTask({ task_str_id, description, estimated_time_minutes });
    res.status(201).json({ internal_db_id: task.id, task_str_id: task.task_str_id, status: task.status });
  } catch (err) {
    res.status(400).json({ error: 'Task ID must be unique' });
  }
});

router.get('/:task_str_id', (req, res) => {
  const task = taskModel.getTaskByStrId(req.params.task_str_id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.put('/:task_str_id/status', (req, res) => {
  const { new_status } = req.body;
  try {
    const updated = taskModel.updateStatus(req.params.task_str_id, new_status);
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/next-to-process', (req, res) => {
  const task = taskModel.getNextToProcess();
  if (!task) return res.status(404).json({ error: 'No pending tasks' });
  res.json(task);
});

router.get('/pending', (req, res) => {
  const { sort_by, order, limit } = req.query;
  const tasks = taskModel.listPendingTasks(sort_by, order, parseInt(limit) || 10);
  res.json(tasks);
});

module.exports = router;
