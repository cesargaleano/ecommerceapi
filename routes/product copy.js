const router= require('express').Router();
const Product = require('../models/Product');


router.get('/',async(req,res)=>{
    console.log("Ingresando a Productos")
    const productList = await Product.find();
    //console.log(productList);
    return res.send(productList);
})




module.exports = router;