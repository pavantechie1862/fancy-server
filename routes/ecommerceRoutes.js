const express = require("express");
const {
  registerUser,
  loginUser,
  addToCart,
  fetchCartItems,
} = require("../controllers/ecommerceControlers");

const router = express.Router();
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

//cart routes
router.post("/addtocart", addToCart);
router.get("/getCart", fetchCartItems);

module.exports = router;
