const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Words, Dictionary, Theme } = require('../../models');

// Load a random targetWord
router.get('/my-word', async (req, res) => {
  try {

    //  ??Get Words model length and pick a random id value to get

    // Get associated target word along with it's associated theme
    // const targetData = await Words.findByPk()
    // const targetData = await Words.findOne({
    //   order: [
    //     Sequelize.fn( 'RAND' ),
    //   ]
    // });
    let targetData = [];
    targetData = await Words.findOne({
      attributes: ['word'],
      raw: true,
      order: sequelize.random(),
    });
    
    res.send(targetData);
    // return targetData;
    //Render the 'homepage' Handlebars.js template.
    // res.render('homepage', {
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Load the dictionary
router.get('/my-dictionary', async (req, res) => {
  
  //Render the 'homepage' Handlebars.js template.
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});

// Load themes
router.get('/my-theme', async (req, res) => {
  
  //Render the 'homepage' Handlebars.js template.
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
