const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const routes = require('./routes');
const AuthController = require('./controllers/AuthController');
// const mwAuthentication = require('./middleware/authentication');
// const mwLogin = require('./middleware/login');
// const mwRequestTime = require('./middleware/requestTime');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));
// app.use(mwAuthentication);
// app.use(mwLogin);
// app.use(mwRequestTime);
app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));