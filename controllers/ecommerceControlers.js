// imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const { User, Cart, sequelize, Product, Params } = require("../models/index");
const { KDM_ECOMMERCE_TOKEN } = require("../static/tokens");
const { v4: uuidv4 } = require("uuid");

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

    return response.status(200).send({
      message: "You have registered successfully",
      jwt_token: token,
      userDetails: { email, mobile },
    });
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
    // console.error("Error fetching user details:", error);
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
    res.status(200).json({ jwt_token, userDetails: user });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addToCart = async (req, res) => {
  const { data } = req.body;
  const sample_id = uuidv4();

  const t = await sequelize.transaction();

  try {
    const currentUser = await getUserEmailFromToken(req);

    const existingCartItem = await Cart.findOne({
      where: {
        product_id: parseInt(data[0].subgroup),
        added_by: currentUser,
      },
      transaction: t,
    });

    for (const item of data) {
      const { subgroup, paramId } = item;

      await Cart.create(
        {
          sample_id: sample_id,
          product_id: parseInt(subgroup),
          param_id: BigInt(paramId),
          added_by: currentUser,
        },
        { transaction: t }
      );
    }

    await t.commit();
    return res.status(200).json({
      message: "Selected added to cart successfully",
      cartItem: req.body,
    });
  } catch (error) {
    console.error("Error adding items to cart:", error);
    await t.rollback();
    return res
      .status(500)
      .json({ message: "Internal server error, Please try again later" });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const currentUser = await getUserEmailFromToken(req);
    const cartItems = await Cart.findAll({
      where: {
        added_by: currentUser,
      },
    });

    const formattedCartItems = {};
    for (const item of cartItems) {
      const { sample_id, product_id, param_id } = item;
      const param = await Params.findByPk(param_id);
      if (!formattedCartItems[sample_id]) {
        const product = await Product.findByPk(product_id);
        formattedCartItems[sample_id] = {
          sampleId: sample_id,
          productId: product_id,
          productName: product.name,
          productCategory: product.category,
          img: product.image,
          isOffer: product.isOffer,
          offer: product.offer,
          parameters: [param],
        };
      } else {
        formattedCartItems[sample_id].parameters.push(param);
      }
    }

    const data = Object.values(formattedCartItems);
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  const { data } = req.headers;
  const userEmail = getUserEmailFromToken(req);

  try {
    await Cart.destroy({
      where: {
        sample_id: data,
        added_by: userEmail,
      },
    });
    return res
      .status(200)
      .json({ message: "Sample item deleted successfully", data });
  } catch (error) {
    console.error("Error deleting sample from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const cartCheckout = async (req, res) => {
  try {
    console.log(req.body);

    const { amount } = req.body;

    const options = req.body;
    console.log(options);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_SECRET_KEY,
      key_secret: process.env.RAZORPAY_SECRET_ID,
    });
    const order = await razorpay.orders.create(options);
    if (!order) {
      console.log("Error encountered in creating order on server");
      return res
        .status(500)
        .json({ message: "Error encountered in creating order on server" });
    }

    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUserEmailFromToken,
  registerUser,
  getUserDetailsByEmail,
  checkUserExistsByEmail,
  loginUser,

  //cart related controllers
  addToCart,
  fetchCartItems,
  deleteCartItem,
  cartCheckout,
};
