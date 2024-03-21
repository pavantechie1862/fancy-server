const express = require("express");
const {
  registerUser,
  loginUser,
  addToCart,
  fetchCartItems,
  deleteCartItem,
} = require("../controllers/ecommerceControlers");

const router = express.Router();
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

//cart routes
router.post("/addtocart", addToCart);
router.get("/getCart", fetchCartItems);
router.delete("/delete-cart", deleteCartItem);

module.exports = router;
