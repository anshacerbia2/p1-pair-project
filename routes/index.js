const router = require('express').Router();
const authRouter = require('./user');
const dashboardRouter = require('./product');

router.get('/', (request, response) => {
  console.log(request.session);
  response.render('home')
});
router.use(authRouter);
router.use(dashboardRouter);
router.get('/logout', (request, response) => {
  request.session.destroy(err => {
    if (err) console.log(err);
    else response.redirect('/');
  });
});
// router.use(isAuth, dashboardRouter);

module.exports = router;