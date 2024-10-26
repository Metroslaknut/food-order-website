const userModel = require("../models/userModel")

const uploadProductPermission = async(userId) => {
    const user = await userModel.findById(userId)

    if(user.role === 'STORE_OWNER'|| user.role === 'MANAGER'){
        return true
    }

    return false
}


module.exports = uploadProductPermission