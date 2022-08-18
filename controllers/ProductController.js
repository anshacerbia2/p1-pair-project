const { Op } = require("sequelize");
const { User, Category, Product } = require('../models');

class Controller {
  static showProduct(req, res) {
    let { sort, CategoryId, search } = req.query
    let option = {}
    let result = {}
    if (sort) {
      option = {
        order: [[`${sort}`, "ASC"]]
      }
    }
    if (CategoryId) {
      option = {
        where: {
          CategoryId: CategoryId
        }
      }
    }
    if (search) {
      option = {
        where: {
          name: { [Op.iLike]: `%${search}%` }
        }
      }
    }
    Product.findAll(option)
      .then((hasil) => {
        result = hasil
        return Category.findAll()
      })
      .then((result2) => {
        res.render('productShow', { result, result2 })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static addProduct(req, res) {
    Category.findAll()
      .then((categories) => {
        res.render("addProductPage", { categories, input: {}, invalid: {}, data: {} });
      })
      .catch((err) => {
        res.send(err);
      })
  }

  static hendleAddProduct(request, response) {
    const { name, brand, stock, price, description, CategoryId, UserId } = request.body;
    const input = { name, brand, stock, price, description, CategoryId, UserId };
    console.log(input);
    Product.create(input)
      .then(() => response.redirect('/product'))
      .catch(err => {
        if (!err.errors) response.send(err);
        else {
          let invalid = {};
          err.errors.forEach(v => invalid[v.path] = v.message);
          Category.findAll()
            .then(categories => response.render('addProductPage', { categories, input, invalid }))
            .catch(err => response.send(err));
        }
      });
  }

  static editProduct(req, res) {
    let { id } = req.params
    let result = {}
    Product.findByPk(id, { include: Category })
      .then((hasil) => {
        result = hasil
        return Category.findAll()
      })
      .then((categories) => {
        res.render('editProductPage', { input, categories, invalid })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static hendleEditProduct(req, res) {
    let id = req.params.id
    let { name, brand, stock, prince, description, CategoryId, UserId } = req.body
    Product.update({
      name: name,
      brand: brand,
      stock: stock,
      prince: prince,
      description: description,
      CategoryId: CategoryId,
      UserId: UserId
    }, {
      where: {
        id: id
      }
    })
      .then(() => {
        res.redirect('/product')
      })
      .then((err) => {
        res.send(err)
      })
  }

  static deleteProduct(req, res) {
    let id = req.params.id
    Product.destroy({
      where: {
        id: id
      }
    })
      .then(() => {
        res.redirect('/product')
      })
      .catch((err) => {
        res.send(err)
      })
  }

}

module.exports = Controller