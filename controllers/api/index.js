// NodeJS middleware for routes
const router = require('express').Router();
// Sequelize ORM models
const { User, Dictionary, Theme, Words } = require('../../models');
// NodeJS module for filepaths
const path = require('path');
// Route to manage User authentication activities
const userRoutes = require('./user-routes');
// routes for game data
const gameRoutes = require('./game-routes.js');

// URL path for user management
router.use('/users', userRoutes);
router.use('/game', gameRoutes);

module.exports = router;