// NodeJS middleware for routes
const router = require('express').Router();
// Sequelize ORM models
const { User } = require('../../models');
// NodeJS module for filepaths
const path = require('path');
// Routes to manage User authentication activities (logon, new user, etc)
const userRoutes = require('./user-routes');

// URL path for user management
router.use('/users', userRoutes);

module.exports = router;