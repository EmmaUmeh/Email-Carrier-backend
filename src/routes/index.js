const express = require('express');
const router = express.Router();

const emailRoutes = require('./emailRoutes');
const authRoutes = require('./user.routes')

// Define authentication routes


// Include email routes
router.use('/emails', emailRoutes);
router.use('/auth', authRoutes);


module.exports = router;
