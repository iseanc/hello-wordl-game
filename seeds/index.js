const seedTheme = require('./theme-seeds');
const seedWords = require('./words-data');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedTheme();
  console.log('\n----- THEMES SEEDED -----\n');

  await seedWords();
  console.log('\n----- WORDS SEEDED -----\n');

  process.exit(0);
};

seedAll();
