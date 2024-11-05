const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogOut");
const getUsersController = require("../controller/user/getUsers");
const updateUser = require("../controller/user/updateUser");
const CreateCategory = require("../controller/category/createCategory");
const UploadProduct = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const CreateStore = require("../controller/store/createStore");
const getCategoryController = require("../controller/category/getCategory");
const getStoreController = require("../controller/store/getStore");
const updateStore = require("../controller/store/updateStore");
const CreatePackage = require("../controller/package/createPackage");
const getPackageController = require("../controller/package/getPackage");
const { deleteStore } = require("../controller/store/deleteStore");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin-panel
router.post("/update-user",authToken,updateUser)
router.get("/get-user", authToken, getUsersController);

//product
router.post("/upload-product",authToken,UploadProduct)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)

//category
router.post("/create-category",authToken,CreateCategory)
router.get("/get-category", authToken, getCategoryController)

//store
router.post("/create-store",authToken,CreateStore)
router.get("/get-store", authToken, getStoreController);
router.put("/update-store/:id", authToken, updateStore);
router.delete("/store/:id", authToken, deleteStore);

//package
router.post("/create-package",authToken,CreatePackage)

router.get("/get-package",authToken,getPackageController)

module.exports = router;
