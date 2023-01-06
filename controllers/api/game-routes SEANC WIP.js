const router = require('express').Router();
const { Words, Dictionary, Theme } = require('../../models');

// Load a random targetWord
router.get('/target-word', async (req, res) => {
  try {
    // Get a target word along with it's associated theme
    const targetData = await Words.f
    //Render the 'homepage' Handlebars.js template.
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
    });
  }
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
