'use strict';
const { Model } = require('sequelize');
const hashPassword = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product);
      User.hasOne(models.UserProfile);
    }

    get accaountAge() {
      return `${~~((new Date().getTime() - Date.parse(this.createdAt)) / 86400000)} Hari`
    }

    get accaountAge(){
      return `${~~((new Date().getTime() - Date.parse(this.createdAt)) / 86400000)} Hari`
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required username field.' },
        notNull: { msg: 'Required username field.' }
      },
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required email field.' },
        notNull: { msg: 'Required email field.' },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required password field.' },
        notNull: { msg: 'Required password field.' }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (val) => {
        val.password = hashPassword(val.password);
        val.role = 'user';
      }
    }
  });
  return User;
};