// NodeJS middleware for routes
const router = require('express').Router();
// Sequelize ORM models
const { User, Dictionary, Theme, Words } = require('../../models');
// NodeJS module for filepaths
const path = require('path');
// Routes to manage User authentication activities (logon, new user, etc)
const userRoutes = require('./user-routes');
// const gameRoutes = require('./game-routes.js');
const gameRoutes = require('./game-routes-SEANC-WIP.js');

// URL path for user management
router.use('/users', userRoutes);
router.use('/game', gameRoutes);

module.exports = router;