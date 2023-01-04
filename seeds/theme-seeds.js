const { Theme } = require('../models');

const themedata = [
  {
    theme_name: 'Coding',
  },
  {
    theme_name: 'Fruit',
  },
  {
    theme_name: 'Seasons',
  },
  {
    theme_name: 'Sports',
  },
  {
    theme_name: 'Animals',
  },
];

const seedTheme = () => Theme.bulkCreate(themedata);

module.exports = seedTheme;
