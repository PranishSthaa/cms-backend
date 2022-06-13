'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fee.belongsTo(models.Student)
    }
  }
  Fee.init({
    type: DataTypes.STRING,
    receipt_no: DataTypes.STRING,
    amount: DataTypes.STRING,
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Fee',
  });
  return Fee;
};