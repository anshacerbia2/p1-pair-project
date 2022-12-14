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
      .then(() => response.redirect('/dashboard/admin'))
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
    console.log()
    let product = {}
    Product.findByPk(id, { include: Category })
      .then((hasil) => {
        product = hasil
        return Category.findAll()
      })
      .then((categories) => {
        res.render('editProductPage', { input : {}, categories, product, invalid : {} })
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
        res.redirect('/dashboard/admin')
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
        res.redirect('/dashboard/admin/')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static showUser(req, res) {
    User.findAll({
      where: {
        role: "user"
      }
    })
      .then((result) => {
        res.render('userPage', { result })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static deleteUser(req, res) {
    let id = req.params.id
    User.destroy({
      where: {
        id: id
      }
    })
      .then(() => {
        res.redirect('/dashboard/admin/listUser')
      })

      .catch((err) => {
        res.send(err)
      })
  }

  static showUser(req, res){
    User.findAll({
      where : {
        role : "user"
      }
    })
    .then((result) =>{
        res.render('userPage', {result})
    })
    .catch((err) =>{
      res.send(err)
    })
  }

  static deleteUser(req,res) {
  let id = req.params.id
  User.destroy({
    where : {
      id : id
    }
  })
  .then(() =>{
    res.redirect('/dashboard/admin/listUser')
  })
  
  .catch((err) =>{
    res.send(err)
  })
  }

}

module.exports = Controller