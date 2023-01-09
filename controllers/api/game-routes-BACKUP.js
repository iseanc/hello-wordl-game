const router = require('express').Router();
const { Words, Dictionary, Theme } = require('../../models');

// Load the targetWord
router.get('/target-word', async (req, res) => {
  
  //Render the 'homepage' Handlebars.js template.
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});

// Load the dictionary
router.get('/', async (req, res) => {
  
  //Render the 'homepage' Handlebars.js template.
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});

// Load themes
router.get('/', async (req, res) => {
  
  //Render the 'homepage' Handlebars.js template.
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
