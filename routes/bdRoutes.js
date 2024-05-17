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

  //website
  getSiteUsers,

  // Graphs
  getSubscriberStatisticsMonthly,
  getSubscriberStatisticsLast30Days,
  getCustomerStatisticsMonthly,
  getLast30CustomerCounts,
  getOrderStatisticsMonthly,
  getLast30DaysOrderCounts,
  getProductSampleCounts,
  getDisciplineWise,
  getOnlineUsersMonthly,
  getOnlineUsersDaily,
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
router.get("/get-online-users", getSiteUsers);

router.post("/reg-customer", addCustomer);
router.get("/get-subscribers-list", getSubscribers);
router.get("/get-subscribers-graph", getSubscriberStatisticsMonthly);
router.get(
  "/get-subscribers-graph-last30days",
  getSubscriberStatisticsLast30Days
);

//pending
router.get("/get-customers-graph", getCustomerStatisticsMonthly);
router.get("/get-customers-graph-last30days", getLast30CustomerCounts);

router.get("/orders-monthly-record", getOrderStatisticsMonthly);
router.get("/order-daily-record", getLast30DaysOrderCounts);
router.get("/samples-statistics", getProductSampleCounts);
router.get("/discipline-wise", getDisciplineWise);
router.get("/get-online-users-daily", getOnlineUsersDaily);
router.get("/get-online-users-monthly", getOnlineUsersMonthly);

module.exports = router;
