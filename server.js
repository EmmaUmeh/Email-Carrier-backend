const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
// Import routes
// const emailRoutes = require('./src/routes/emailRoutes');
const userRoutes = require('./src/routes/user.routes'); // Add auth routes
const { connectToDatabase } = require('./src/config/database');
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
// app.use('/emails', emailRoutes);
app.use('/auth', userRoutes); // Use authentication routes

// Default route

 // Adjust the path

// Connect to the database
connectToDatabase();

// Add a route to check the database connection
app.get('/', (req, res) => {
  const db = require('mongoose').connection;
  if (db.readyState === 1) {
    res.send('Database is connected');
  } else {
    res.send('Database connection is not established');
  }
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
