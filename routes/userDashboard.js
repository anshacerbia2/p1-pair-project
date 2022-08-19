const router = require('express').Router();
const UserDashboardController = require('../controllers/UserDashboardController');

const isAuthUser = (request, response, next) => {
  if (request.session.user && request.session.user.role === 'user') next();
  else response.redirect('/login');
}

router.get('/dashboard/user', isAuthUser, UserDashboardController.userDashboardIndex);
router.get('/dashboard/user/buyItem/:itemId', isAuthUser, UserDashboardController.userBuy);
// router.post('/user/:id/buyProduct')

module.exports = router;

