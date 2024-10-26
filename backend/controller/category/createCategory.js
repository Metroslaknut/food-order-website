const createCategoryPermission = require("../../helpers/createCategoryPremission")
const categoryModel = require("../../models/categoryModel")

async function CreateCategory(req,res){
    try {
        const sessionUserId = req.userId

        if(!createCategoryPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
    
        const createCategory = new categoryModel(req.body)
        const saveCategory = await createCategory.save()

        res.status(201).json({
            message : "Create category successfully",
            error : false,
            success : true,
            data : saveCategory
        })
    } catch (error) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = CreateCategory