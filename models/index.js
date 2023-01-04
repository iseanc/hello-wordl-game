const User = require('./User');
const Theme = require('./Theme');
const Words = require('./Words');

// Add Sequelize associations (hasOne, hasMany, etc) here

// Words has ONE Theme (NULL should be allowed)
Words.belongsTo = (Theme, {
  foreignKey: 'theme_id',
});

Theme.hasMany(Words, {
  foreignKey: 'theme_id',
});

module.exports = {
  User,
  Theme,
  Words,
};
