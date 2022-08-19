const { User, Category, Product, UserProfile } = require('../models');

class UserDashboardController {
  static userDashboardIndex(request, response) {
    let products;
    let categories;
    Product.findAll({ include: [Category] })
      .then(resProducts => {
        products = resProducts;
        return Category.findAll();
      })
      .then(resCategories => {
        categories = resCategories;
        return User.findByPk(+request.session.user.id, { include: UserProfile });
      })
      .then(user => {
        response.render('userDashboard', { user, products, categories });
      })
      .catch(err => response.send(err));
  }

  static userBuy(request, response) {
    const id = +request.params.itemId;
    let price;
    Product.findByPk(id)
      .then(product => {
        price = product.price;
        console.log(price);
        return Product.update({ stock: 1 }, { where: { id: id } });
      })
      .then(() => {
        return UserProfile.findOne({ where: { UserId: +request.session.user.id } })
      })
      .then((user) => {
        return UserProfile.update({ balance: user.balance - price }, { where: { UserId: +request.session.user.id } })
      })
      .then(() => response.redirect('/dashboard/user'))
      .catch(err => {
        if (!err.errors) response.send(err)
        else {
          response.send(err)
          // let invalid = {}
          // let products;
          // let categories;
          // Product.findAll({ include: [Category] })
          //   .then(resProducts => {
          //     products = resProducts;
          //     return Category.findAll();
          //   })
          //   .then(resCategories => {
          //     categories = resCategories;
          //     return User.findByPk(+request.session.user.id, { include: UserProfile });
          //   })
          //   .then(user => {
          //     response.render('userDashboard', { user, products, categories, invalid });
          //   })
        }
      });
  }
}

module.exports = UserDashboardController;