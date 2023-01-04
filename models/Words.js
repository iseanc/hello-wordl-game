const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Words extends Model {}

Words.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        word: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        theme_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'gallery',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'words'
    }
);

module.exports = Words;