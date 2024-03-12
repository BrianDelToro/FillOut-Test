// app.js

const express = require('express');
const formRoutes = require('./routes/formRoutes');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount formRoutes for handling form-related routes
app.use('/', formRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
