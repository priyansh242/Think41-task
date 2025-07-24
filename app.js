// app.js
const express = require('express');
const app = express();
const taskRoutes = require('./tasks');

app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Task Scheduler API running on http://localhost:${PORT}`);
});
