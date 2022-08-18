const router = require('express').Router();
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');

const isAuth = (request, response, next) => {
  if (request.session) next();
  else response.redirect('/login');
}

router.get('/product', isAuth, ProductController.showProduct)
router.get('/product/add', ProductController.addProduct)
router.post('/product/add', ProductController.hendleAddProduct)
router.get('/product/edit/:id', ProductController.editProduct)
router.post('/product/edit/:id', ProductController.hendleEditProduct)
router.get('/product/delete/:id', ProductController.deleteProduct)

module.exports = router;

