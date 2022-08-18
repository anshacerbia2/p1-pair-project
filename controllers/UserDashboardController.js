const { User, Category, Product } = require('../models');

class UserController {
  
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
  static listUsers(request, response) {
    User.findAll({
      include: [{
        model: Product,
        include: [Category]
      }]
    })
      .then(users => response.send(users))
      .catch(err => response.send(err));
  }
}

module.exports = UserController;