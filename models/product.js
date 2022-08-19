'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User);
      Product.belongsTo(models.Category);
    }

    get formatRupiah() {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.price);

    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required name field' },
        notNull: { msg: 'Required name field.' }
      }
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required brand field' },
        notNull: { msg: 'Required brand field.' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required stock field' },
        notNull: { msg: 'Required stock field.' },
        min: {
          args: [0],
          msg: 'Minimum stock required is 10'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required price field' },
        notNull: { msg: 'Required price field.' },
        min: {
          args: [0],
          msg: 'Minimum price required is 0'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required description field' },
        notNull: { msg: 'Required description field.' },
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required category field' },
        notNull: { msg: 'Required category field.' },
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Required user field' },
        notNull: { msg: 'Required user field.' },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};