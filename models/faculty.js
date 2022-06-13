'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Faculty.hasMany(models.Student)
      Faculty.hasMany(models.Subject)
    }
  }
  Faculty.init({
    name: DataTypes.STRING,
    faculty_code: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Faculty',
  });
  return Faculty;
};