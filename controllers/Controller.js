const { Op } = require("sequelize");
const { User, Category, Product } = require('../models');

class Controller {
    static home (request,respons) {
    console.log(request.session.isAuth);
    let { sort, CategoryId, search } = request.query
    let option = {}
    let result = {}
    if (sort) {
      option = {
        order: [[`${sort}`, "ASC"]]
      }
    }
    if (CategoryId) {
      option = {
        where: {
          CategoryId: CategoryId
        }
      }
    }
    if (search) {
      option = {
        where: {
          name: { [Op.iLike]: `%${search}%` }
        }
      }
    }
    Product.findAll(option)
      .then((hasil) => {
        result = hasil
        return Category.findAll()
      })
      .then((result2) => {
        respons.render('home', { result, result2 })
      })
      .catch((err) => {
        respons.send(err)
      })
    }

    static productDetail(req, res){
    // Incubator.find()
    // .then((result) =>{
    // res.render('incubatorsPage', {result})
    // })
    // .catch((err) =>{
    // res.send(err)
    // })
    }
}
module.exports = Controller