const { Callback, Subscriber, Product, Params } = require("../models/index");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const createCallbackRequest = async (req, res) => {
  try {
    const { name, mobile, whatsapp } = req.body;
    const callbackRequest = await Callback.create({
      name,
      mobile,
      whatsapp_consent: whatsapp,
    });

    res.status(201).json({ success: true, callbackRequest });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const subscribeController = async (req, res) => {
  try {
    const { email } = req.body;
    const existingSubscriber = await Subscriber.findOne({ where: { email } });

    if (existingSubscriber) {
      return res.status(400).json({ error: "Email is already subscribed" });
    }

    const newSubscriber = await Subscriber.create({ email });

    res
      .status(200)
      .json({ message: "Successfully subscribed", subscriber: newSubscriber });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
};

const uploadFileToS3 = (file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_MATERIALS_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
      // ACL: "public-read",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file to S3:", err);
        reject(err);
      } else {
        console.log("File uploaded successfully:", data.Location);
        resolve(data);
      }
    });
  });
};

const onAddingNewProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      rating,
      base_price,
      isOffer,
      offer,
      prefix,
      complete_pack,
      description,
      no_of_days,
      interim_report,
      interim_report_days,
      features,
    } = req.body;

    let imageUrl = null;
    let imageLgUrl = null;

    if (req.files["image"]) {
      const imageFile = req.files["image"][0];
      const uploadedImage = await uploadFileToS3(imageFile);
      imageUrl = uploadedImage.Location;
    }

    if (req.files["image_lg"]) {
      const imageFile = req.files["image_lg"][0];
      const uploadedImage = await uploadFileToS3(imageFile);
      imageLgUrl = uploadedImage.Location;
    }

    const newProduct = await Product.create({
      name,
      category,
      rating,
      base_price,
      isOffer,
      offer,
      prefix,
      complete_pack,
      description,
      no_of_days,
      interim_report,
      interim_report_days,
      features: features ? JSON.stringify(features) : null,
      image: imageUrl,
      image_lg: imageLgUrl,
    });

    console.log(imageLgUrl, imageUrl);

    console.log("Product added successfully");
    res.status(201).json({ success: true, newProduct });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).send("Internal server error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

const editProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      rating,
      base_price,
      isOffer,
      offer,
      prefix,
      complete_pack,
      description,
      no_of_days,
      interim_report,
      interim_report_days,
      features,
    } = req.body;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update({
      name,
      category,
      rating,
      base_price,
      isOffer,
      offer,
      prefix,
      complete_pack,
      description,
      no_of_days,
      interim_report,
      interim_report_days,
      features: features ? JSON.stringify(features) : null,
    });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ message: "Failed to edit product" });
  }
};

const getProductPartialData = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "image",
        "name",
        "isOffer",
        "base_price",
        "features",
        "offer",
      ],
    });

    const formattedProducts = products.map((product) => ({
      id: product.id,
      image: product.image,
      name: product.name,
      offer: product.offer,
      isOffer: product.isOffer,
      base_price: product.base_price,
      features: JSON.parse(product.dataValues.features).map(
        (each) => each.short_feature
      ),
    }));

    res.status(200).json({ products: formattedProducts });
  } catch (error) {
    console.error("Error fetching partial product data:", error);
    res.status(500).json({ message: "Failed to fetch partial product data" });
  }
};

const getAllProductsNameId = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name"],
    });

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addParams = async (req, res) => {
  console.log("hey am here");
  try {
    const {
      id,
      isNabl,
      price,
      subgroup,
      params,
      available,
      additional_info,
      discipline,
      common_req,
      requirements,
    } = req.body;

    // Create a new record in the Params table
    const newParams = await Params.create({
      param_id: id,
      is_nabl: isNabl,
      price,
      subgroup,
      params,
      available,
      additional_info,
      discipline,
      common_req,
      requirements,
    });

    res
      .status(201)
      .json({ message: "Params record added successfully", params: newParams });
  } catch (error) {
    console.error("Error adding Params record:", error);
    res.status(500).json({
      message: "Failed to add Params record. Please try again later.",
    });
  }
};

module.exports = {
  createCallbackRequest,
  subscribeController,
  onAddingNewProduct,

  //products
  getAllProducts,
  getProductById,
  deleteProductById,
  editProductById,
  getProductPartialData,
  getAllProductsNameId,

  //params
  addParams,
};
