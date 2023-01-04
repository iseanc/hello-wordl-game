const seedTheme = require('./theme-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedTheme();
  console.log('\n----- THEMES SEEDED -----\n');

  process.exit(0);
};

seedAll();
