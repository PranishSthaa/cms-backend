'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.belongsTo(models.Faculty);
      Subject.belongsTo(models.Teacher);
      Subject.hasMany(models.TimeTable);
      Subject.hasMany(models.Attendance);
    }
  }
  Subject.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    credit_hour: DataTypes.INTEGER,
    full_marks_theory: DataTypes.INTEGER,
    pass_marks_theory: DataTypes.INTEGER,
    full_marks_practical: DataTypes.INTEGER,
    pass_marks_practical: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};