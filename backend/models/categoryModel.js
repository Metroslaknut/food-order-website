const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // เก็บ userID
    storeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    storeName: { type: String, required: true },
    categoryName: { type: String, required: true },
},{
    timestamps : true
})


const categoryModel = mongoose.model("category",categorySchema)

module.exports = categoryModel