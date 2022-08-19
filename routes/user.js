const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

const isAuth = (request, response, next) => {
  if (request.session.user) response.redirect('/');
  else next();
}

router.get('/login', isAuth, AuthController.loginIndex);
router.post('/login', isAuth, AuthController.login);
router.get('/register', isAuth, AuthController.registerIndex);
router.post('/register', isAuth, AuthController.addUser);


module.exports = router;