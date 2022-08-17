const { request } = require('express');
const express = require('express');
const Controller = require('./controllers/categoryController');
const app = express();
const port = 3000;
const UserController = require('./controllers/UserController');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.get('/', (request, response) => response.render('home'));
app.get('/login', (request, response) => response.render('login'));
app.get('/product', Controller.showProduct)
app.get('/product/add', Controller.addProduct)
app.post('/product/add', Controller.hendleAddProduct)
app.get('/product/edit/:id', Controller.editProduct)
app.post('/product/edit/:id', Controller.hendleEditProduct)
app.get('/product/delete/:id', Controller.deleteProduct)


app.listen(port, () => console.log(`Server listening on port ${port}`));