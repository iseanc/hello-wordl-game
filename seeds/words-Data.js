const { Words } = require('../models');

const wordsdata = [
    {
       word: 'branch',
       theme_id: 1,
    },
    {
        word: 'button',
        theme_id: 1,
     },
     {
        word: 'export',
        theme_id: 1,
     },
     {
        word: 'failed',
        theme_id: 1,
     },
     {
        word: 'hidden',
        theme_id: 1,
     },
     {
        word: 'import',
        theme_id: 1,
     },
     {
        word: 'module',
        theme_id: 1,
     },
     {
        word: 'return',
        theme_id: 1,
     },
     {
        word: 'search',
        theme_id: 1,
     },
     {
        word: 'banana',
        theme_id: 2,
     },
     {
        word: 'almond',
        theme_id: 2,
     },
     {
        word: 'walnut',
        theme_id: 2,
     },
     {
        word: 'papaya',
        theme_id: 2,
     },
     {
        word: 'cherry',
        theme_id: 2,
     },
     {
        word: 'summer',
        theme_id: 3,
     },
     {
        word: 'winter',
        theme_id: 3,
     },
     {
        word: 'spring',
        theme_id: 3,
     },
     {
        word: 'autumn',
        theme_id: 3,
     },
     {
        word: 'aikido',
        theme_id: 4,
     },
     {
        word: 'squash',
        theme_id: 4,
     },
     {
        word: 'soccer',
        theme_id: 4,
     },
     {
        word: 'tennis',
        theme_id: 4,
     },
     {
        word: 'hockey',
        theme_id: 4,
     },
     {
        word: 'baboon',
        theme_id: 5,
     },
     {
        word: 'coyote',
        theme_id: 5,
     },
     {
        word: 'donkey',
        theme_id: 5,
     },
     {
        word: 'falcon',
        theme_id: 5,
     },
     {
        word: 'gerbil',
        theme_id: 5,
     },
]

const seedWords = () => Words.bulkCreate(wordsdata);

module.exports = seedWords;