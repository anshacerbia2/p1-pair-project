const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

const isAuth = (request, response, next) => {
  if (request.session) response.redirect('/');
  else next();
}

router.get('/login', AuthController.loginIndex);
router.post('/login', AuthController.login);
router.get('/register', AuthController.registerIndex);
router.post('/register', AuthController.addUser);

module.exports = router;