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
  getRequestCallbacks,
  uploadCustomerRequestAudio,
  getAllEcommerceOrders,
  completeEcommerceOrderRegistration,
  getCustomersList,
  addCustomer,
  getSubscribers,

  // Graphs
  getSubscriberStatisticsMonthly,
  getSubscriberStatisticsLast30Days,
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
router.get("/get-request-callbacks", getRequestCallbacks);
router.post(
  "/upload-customer-request-audio",
  upload.single("audio"),
  uploadCustomerRequestAudio
);

router.get("/get-ecommerce-orders", getAllEcommerceOrders);
router.post(
  "/complete-ecommerce-order-registration",
  upload.single("letter"),
  completeEcommerceOrderRegistration
);

router.get("/get-customers-list", getCustomersList);
router.post("/reg-customer", addCustomer);
router.get("/get-subscribers-list", getSubscribers);
router.get("/get-subscribers-graph", getSubscriberStatisticsMonthly);
router.get(
  "/get-subscribers-graph-last30days",
  getSubscriberStatisticsLast30Days
);

module.exports = router;
