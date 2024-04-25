const express = require("express");

const {
  registerUser,
  loginUser,
  addToCart,
  fetchCartItems,
  deleteCartItem,
  cartCheckout,
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
// router.get("/get-full-details", getProductById);
router.get("/get-product-details/:id", getProductById);
router.post("/cart/create-order-on-server", cartCheckout);

module.exports = router;
