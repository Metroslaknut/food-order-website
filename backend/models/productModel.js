const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel