const express = require("express");
const router = express.Router();
const multer = require("multer");
const { memoryStorage } = require("multer");
require("dotenv").config();

const {
  createCallbackRequest,
  subscribeController,
  onAddingNewProduct,
  getAllProductsNameId,
  addParams,
} = require("../controllers/bdControllers");

const storage = memoryStorage();
const upload = multer({ storage });

router.get("/name-id", getAllProductsNameId);
router.post("/on-request-callback", createCallbackRequest);
router.post("/subscribe", subscribeController);
router.post(
  "/adding-new-product",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image_lg", maxCount: 1 },
  ]),
  onAddingNewProduct
);

router.post("/add-param", addParams);

module.exports = router;
