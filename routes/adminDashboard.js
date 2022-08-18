const router = require('express').Router();
// const UserController = require('../controllers/UserDashboardController');
const AdminDashboardController = require('../controllers/AdminDashboardController');

const isAuthAdmin = (request, response, next) => {
  
  if (request.session.user && request.session.user.role === 'admin') next();
  else response.redirect('/login');
}

router.get('/dashboard/admin/', isAuthAdmin, AdminDashboardController.showProduct)
// router.get('/dashboard/admin/product/add',isAuthAdmin, AdminDashboardController.addProduct)
// router.post('/dashboard/admin/product/add',isAuthAdmin, AdminDashboardController.hendleAddProduct)
// router.get('/dashboard/admin/product/edit/:id',isAuthAdmin, AdminDashboardController.editProduct)
// router.post('/dashboard/admin/product/edit/:id',isAuthAdmin, AdminDashboardController.hendleEditProduct)
// router.get('/dashboard/admin/product/delete/:id', isAuthAdmin, AdminDashboardController.deleteProduct)

module.exports = router;
