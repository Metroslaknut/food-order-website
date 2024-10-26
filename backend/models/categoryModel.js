const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryName : String,
},{
    timestamps : true
})


const categoryModel = mongoose.model("category",categorySchema)

module.exports = categoryModel