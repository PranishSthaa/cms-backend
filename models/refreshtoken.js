'use strict';

const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RefreshToken.belongsTo(models.User);
    }
  }
  RefreshToken.init({
    token: DataTypes.STRING,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });

  RefreshToken.createToken = async (user) => {
    console.log(user);
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
    let _token = uuidv4();
    let refreshToken = await RefreshToken.create({
      token: _token,
      UserId: user.id,
      expiryDate: expiredAt.getTime(),
    });
    return refreshToken.token;
  }

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  }

  return RefreshToken;
};