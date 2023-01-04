const { Words } = require('..models');

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

]

const seedWords = () => Words.bulkCreate(wordsdata);

module.exports = seedWords;