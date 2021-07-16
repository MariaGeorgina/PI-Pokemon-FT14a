const { DataTypes } = require ('sequelize');
module.exports = (sequelize) => {
sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING// falta id primary key
    }
  }, { timestamps: false})
}