const { Op } = require('sequelize');
const compareHashedPassword = require('../helpers/compareHashedPassword');
const { User, Category, Product } = require('../models');


class AuthController {
  static registerIndex(request, response) {
    response.render('register', { input: {}, invalid: {} });
  }

  static addUser(request, response) {
    const { username, email, password, confirm } = request.body;
    const input = { username, email, password, confirm };
    User.create(input)
      .then(() => response.redirect('login'))
      .catch(err => {
        if (!err.errors) response.send(err);
        else {
          let invalid = {};
          err.errors.forEach(v => invalid[v.path] = v.message);
          console.log(input);
          response.render('register', { input, invalid });
        }
      });
  }

  static loginIndex(request, response) {
    response.render('login', { input: {}, invalid: {} });
  }

  static login(request, response) {
    const { username, password } = request.body;
    const input = { username };
    User.findOne({ where: { username: { [Op.eq]: username } } })
      .then(user => {
        let invalid = {};
        if (user === null || !compareHashedPassword(password, user.password)) {
          invalid.credential = 'Invalid username or password';
          response.render('login', { input, invalid });
        }
        if (compareHashedPassword(password, user.password)) {
          request.session.user = {
            id: user.id,
            role: user.role
          }
          console.log(request.session)
          response.redirect(`/dashboard/${user.role}`)

        }
      })
        .catch(err => response.send(err));
  }
}

module.exports = AuthController;