const router = require('express').Router();
const authRouter = require('./user');
const adminRouter = require('./adminDashboard');
const userRouter = require('./userDashboard');
const Controller = require('../controllers/Controller');

router.get('/', Controller.home);

router.use(authRouter);
router.use(adminRouter);
router.use(userRouter);
// router.get('/logout', (request, response) => {
//   request.session.destroy(err => {
//     if (err) console.log(err);
//     else response.redirect('/');
//   });
// });


// router.use(isAuth, dashboardRouter);

module.exports = router;