const seedTheme = require('./theme-seeds');
const seedWords = require('./words-data');
const seedDictionary = require('./dictionary-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedTheme();
  console.log('\n----- THEMES SEEDED -----\n');

  await seedWords();
  console.log('\n----- WORDS SEEDED -----\n');

  await seedDictionary();
  console.log('\n----- DICTIONARY SEEDED -----\n');

  process.exit(0);
};

seedAll();
