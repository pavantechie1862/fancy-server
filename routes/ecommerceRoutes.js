const express = require("express");

const {
  registerUser,
  loginUser,
  addToCart,
  fetchCartItems,
  deleteCartItem,
} = require("../controllers/ecommerceControlers");
const {
  getProductPartialData,
  getProductById,
} = require("../controllers/bdControllers");

const router = express.Router();
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

//cart routes
router.post("/addtocart", addToCart);
router.get("/getCart", fetchCartItems);
router.delete("/delete-cart", deleteCartItem);

router.get("/get-partial-data", getProductPartialData);
router.get("/get-full-details", getProductById);

module.exports = router;
