const { User, Category, Product } = require('../models');

class UserController {
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