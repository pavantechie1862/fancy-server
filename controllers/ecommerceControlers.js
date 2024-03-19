// imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Cart } = require("../models/index");
const { KDM_ECOMMERCE_TOKEN } = require("../static/tokens");

const getUserEmailFromToken = (req) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    throw new Error("Authorization header missing");
  }
  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token missing in authorization header");
  }

  try {
    const decodedToken = jwt.verify(token, KDM_ECOMMERCE_TOKEN);
    return decodedToken.email;
  } catch (error) {
    throw new Error("Invalid token or token expired");
  }
};

const registerUser = async (request, response) => {
  const { email, mobile, password } = request.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return response.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email,
      mobile: mobile,
      password: hashedPassword,
    });

    const payload = {
      email: newUser.email,
    };
    const token = jwt.sign(payload, KDM_ECOMMERCE_TOKEN);

    return response
      .status(200)
      .send({ message: "You have registered successfully", jwt_token: token });
  } catch (err) {
    // console.error(err);
    return response
      .status(401)
      .send({ message: "Failed to register, Try again" });
  }
};

const getUserDetailsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const checkUserExistsByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return !!user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (req, res) => {
  console.log("in login user");
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const payload = { email: user.email };
    const jwt_token = jwt.sign(payload, KDM_ECOMMERCE_TOKEN);
    res.status(200).json({ jwt_token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addToCart = async (req, res) => {
  const { product_id } = req.body;

  try {
    let userEmail;
    try {
      userEmail = getUserEmailFromToken(req);
    } catch (error) {
      console.error("Error getting user email:", error.message);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingCartItem = await Cart.findOne({
      where: { product_id, added_by: userEmail },
    });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already exists in your cart" });
    }
    const newCartItem = await Cart.create({ product_id, added_by: userEmail });
    return res.status(201).json({
      message: "Product added to cart successfully",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addToCart;

const fetchCartItems = async (req, res) => {
  const userEmail = getUserEmailFromToken(req);
  try {
    const cartItems = await Cart.findAll({ where: { added_by: userEmail } });
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  const { cart_id } = req.params;
  try {
    const cartItem = await Cart.findByPk(cart_id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    await cartItem.destroy();
    return res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  getUserDetailsByEmail,
  checkUserExistsByEmail,
  loginUser,

  //cart related controllers
  addToCart,
  fetchCartItems,
  deleteCartItem,
};
