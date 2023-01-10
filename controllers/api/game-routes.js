const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Words, Dictionary, Theme } = require('../../models');

// Load the target word (player must guess)
router.get('/my-word', async (req, res) => {
  try {
    // Get a random target word 
    // TODO: add associated theme for theme-based play
    
    let targetData = [];
    targetData = await Words.findOne({
      attributes: ['word'],
      raw: true,
      order: sequelize.random(),
    });
    
    res.send(targetData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Load the dictionary
router.get('/dictionary/:value', async (req, res) => {
  
  // //Render the 'homepage' Handlebars.js template.
  // res.render('homepage', {
  //   loggedIn: req.session.loggedIn,
  // });
  try {
    // Lookup guess value in the dictionary
    
    let dictionaryData = [];
    dictionaryData = await Dictionary.findOne({
      where: { word: req.params.value },
      attributes: ['word'],
      raw: true,
    });
    
    if (dictionaryData === null) {
      res.send(false);
    } else {
      res.send(true);
    }
    
    // res.send(test);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// Load themes
router.get('/theme', async (req, res) => {
  
  //Render the 'homepage' Handlebars.js template.
  // res.render('homepage', {
  //   loggedIn: req.session.loggedIn,
  // });
});

module.exports = router;
