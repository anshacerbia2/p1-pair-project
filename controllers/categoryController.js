const { Op } = require("sequelize")
let {Category, Product, User } =  require("../models/index")
class Controller {
    static showProduct(req,res){
        let {sort, CategoryId, search} = req.query
        let option = {}
        let result = {}
        if(sort){
            option = {
                order :  [[`${sort}` , "ASC"]]
            }
        }
        if(CategoryId){
            option = {
                where :{
                    CategoryId : CategoryId
                }
            }
        }
        if(search){
            option = {
                where : {
                    name : { [Op.iLike] : `%${search}%`}
                }
            }
        }
        Product.findAll(option)
        .then((hasil)=>{
            console.log(req.query.CategoryId)
            result = hasil
            return Category.findAll()
        })
        .then((result2) =>{ 
            res.render('productShow', {result, result2})
        })
        .catch((err) =>{
            res.send(err)
        })
    }

    static addProduct (req,res){
        Category.findAll()
        .then((result) =>{
            res.render("addProductPage", {result})
        })
        .catch((err) =>{
            res.send(err)
        })

    }
    static hendleAddProduct(req,res){
        console.log(req.body)
        let { name, brand, stock,price,  description, CategoryId, UserId } = req.body
        Product.create({
            name : name,
            brand : brand,
            stock : stock,
            price : price,
            description : description,
            CategoryId : CategoryId,
            UserId : UserId
        })
        .then(()=>{
            res.redirect('/product')
        })
        .catch((err) =>[
            res.send(err)
        ])
    }

    static editProduct(req,res) {
        let {id} = req.params
        let result = {}
        Product.findByPk(id)
        .then((hasil)=>{
            // console.log(result)
            result = hasil
            return Category.findAll()
        })
        .then((result2) =>{
            // console.log(result.CategoryId, result2)
            res.render('editProductPage', {result, result2}) /// result = product by pk  ==== result2 = category
        })
        .catch ((err) =>{
            res.send(err)
        })
    }

    static hendleEditProduct(req, res) {
        // console.log(req.body)
        // console.log(req.params.id)
        let id = req.params.id
        let {name, brand, stock, prince, description, CategoryId, UserId} = req.body
        Product.update({
            name : name,
            brand : brand,
            stock : stock,
            prince : prince,
            description : description,
            CategoryId : CategoryId,
            UserId : UserId
        }, {
            where : {
                id : id
            }
        })
        .then(() =>{
            res.redirect('/product')
        })
        .then((err)=>{
            res.send(err)
        })
    }

    static deleteProduct(req,res) {
    // console.log(req.params.id) 
    let id = req.params.id
    Product.destroy({
        where : {
            id : id
        }
    })
    .then(() =>{
        res.redirect('/product')
    })
    .catch((err) =>{
        res.send(err)
    })      
    }

}

module.exports = Controller
