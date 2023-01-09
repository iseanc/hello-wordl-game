const router = require('express').Router();
const { User } = require('../models');

// Load the home page
router.get('/', async (req, res) => {
  
  //Render the 'game' Handlebars.js template.
    res.render('game', {
    loggedIn: req.session.loggedIn,
  });
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
