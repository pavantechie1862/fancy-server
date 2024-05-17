const {
  Callback,
  Subscriber,
  Product,
  Params,
  Cart,
  sequelize,
  Sequelize,
  Orders,
  SampleMaterials,
  SampleParams,
  Customers,
  User,
} = require("../models/index");
const { getUserEmailFromToken } = require("../controllers/ecommerceControlers");
const AWS = require("aws-sdk");

require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const getProductsAddedByCurrentUser = async (currentUser, id) => {
  try {
    const cartItems = await Cart.findAll({
      where: {
        added_by: currentUser,
        product_id: id,
      },
      attributes: ["product_id", "sample_id"],
      group: ["product_id", "sample_id"],
    });

    return cartItems;
  } catch (error) {
    throw error;
  }
};

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
      return res.status(404).json({ message: "No products found" });
    }

    const currentUser = await getUserEmailFromToken(req);

    const cartItems = await getProductsAddedByCurrentUser(currentUser, id);

    const params = await Params.findAll({
      where: {
        subgroup: id,
      },
    });

    const formattedParams = params.map((eachParam) => ({
      paramId: eachParam.param_id,
      price: eachParam.price,
      common_req: eachParam.common_req,
      requirement: eachParam.requirements,
      isNabl: eachParam.is_nabl,
      discipline: eachParam.discipline,
      params: JSON.parse(eachParam.params),
      selected: false,
    }));

    console.log("error is not triggered");

    return res
      .status(200)
      .json({ product, params: formattedParams, cartItems });
  } catch (error) {
    console.error("Error fetching products:", error);

    if (
      error.message === "Token missing in authorization header" ||
      error.message === "Invalid token or token expired"
    ) {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      const params = await Params.findAll({
        where: {
          subgroup: id,
        },
      });
      const formattedParams = params.map((eachParam) => ({
        paramId: eachParam.param_id,
        price: eachParam.price,
        common_req: eachParam.common_req,
        requirement: eachParam.requirements,
        isNabl: eachParam.is_nabl,
        discipline: eachParam.discipline,
        params: JSON.parse(eachParam.params),
        selected: false,
      }));
      return res
        .status(200)
        .json({ product, params: formattedParams, cartItems: [] });
    }
    return res.status(500).json({ message: "Failed to fetch products" });
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

    return res.status(200).json({ products: formattedProducts });
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

const getRequestCallbacks = async (req, res) => {
  try {
    const callbacks = await Callback.findAll({
      order: [["requested_at", "ASC"]],
    });
    return res.status(200).json({ data: callbacks });
  } catch (err) {
    console.log("eerror while fetching call back requests", err);
    res.status(500).json({ error: "internal server error" });
  }
};

const uploadAudioFileToS3 = (file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_CUSTOMER_CARE_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
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

const uploadCustomerRequestAudio = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }
    const callbackId = req.body.requestId;
    if (!callbackId) {
      return res.status(400).json({ error: "No callback ID provided" });
    }

    const audioFile = req.file;
    const uploadedFile = await uploadAudioFileToS3(audioFile);
    const audioUrl = uploadedFile.Location;
    await Callback.update(
      { callrecording: audioUrl },
      { where: { request_id: callbackId } },
      { transaction: t }
    );

    t.commit();
    return res.status(200).json({
      message: "Audio uploaded successfully",
      url: audioUrl,
      request_id: callbackId,
    });
  } catch (error) {
    t.rollback();
    console.log(error);
    console.error("Error uploading audio file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEcommerceOrders = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const result = [];
    const ordersList = await Orders.findAll(
      {
        order: [["created_at", "DESC"]],
      },
      { transaction: t }
    );

    for (let eachOrder of ordersList) {
      const orderObj = {
        placedOn: eachOrder.created_at,
        order_id: eachOrder.order_id,

        samples_received: eachOrder.samples_received,
        driver_assigned: eachOrder.driver_assigned,
        proforma_issued: eachOrder.proforma_issued,
        project_name: eachOrder.project_name,
        subject: eachOrder.subject,
        parent_ref: eachOrder.parent_ref,
        nhai_hq_letter: eachOrder.nhai_hq_letter,
        additional_info: eachOrder.additional_info,
        letter: eachOrder.letter,
        due_date: eachOrder.due_date,
        razorpay_order_id: eachOrder.razorpay_order_id,
        razorpay_payment_id: eachOrder.razorpay_payment_id,
        samples_collection_address: eachOrder.samples_collection_address,
        samplesList: [],
      };

      const customerData = await Customers.findByPk(eachOrder.customer_id, {
        transaction: t,
      });

      orderObj.customerData = customerData;

      const samplesList = await SampleMaterials.findAll(
        {
          where: {
            order_id: eachOrder.order_id,
          },
        },
        { transaction: t }
      );

      for (let eachSampleOfIthOrder of samplesList) {
        const sample = {
          //Hey Pav..  you want any additional thing freel free to add
          sample_id: eachSampleOfIthOrder.sample_id,
          product_id: eachSampleOfIthOrder.product_id,
          isOffer: eachSampleOfIthOrder.isOffer,
          offer: eachSampleOfIthOrder.offer,
          chemicalParams: [],
          physicalParams: [],

          brandName: eachSampleOfIthOrder.brandName,
          created_at: eachSampleOfIthOrder.created_at,
          grade: eachSampleOfIthOrder.grade,
          quantity: eachSampleOfIthOrder.quantity,
          ref_code: eachSampleOfIthOrder.ref_code,
          sample_id_optional_field:
            eachSampleOfIthOrder.sample_id_optional_field,
          source: eachSampleOfIthOrder.source,
          week_no: eachSampleOfIthOrder.week_no,
        };

        const productAdditionalInfo = await Product.findByPk(
          eachSampleOfIthOrder.product_id,
          { transaction: t }
        );

        sample.name = productAdditionalInfo.name;
        sample.image = productAdditionalInfo.image;

        const paramsList = await SampleParams.findAll(
          {
            where: {
              sample_id: eachSampleOfIthOrder.sample_id,
            },
          },
          { transaction: t }
        );

        for (let eachParamOfTotalSamples of paramsList) {
          const param = {
            param_id: eachParamOfTotalSamples.param_id,
            orderedPrice: eachParamOfTotalSamples.param_price,
          };

          const paramInfo = await Params.findByPk(
            eachParamOfTotalSamples.param_id,
            { transaction: t }
          );

          param.selectedParams = JSON.parse(paramInfo.params);
          if (paramInfo.discipline === "CHEMICAL") {
            sample.chemicalParams.push(param);
          } else {
            sample.physicalParams.push(param);
          }
        }

        orderObj.samplesList.push(sample);
      }
      result.push(orderObj);
    }

    await t.commit();
    return res.status(200).json({ data: result });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadWorkOrderFileToS3 = (file, id) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_KDM_WORK_ORDER_LETTERS,
      Key: `${id}-letter`,
      Body: file.buffer,
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

const completeEcommerceOrderRegistration = async (req, res) => {
  const t = await sequelize.transaction();
  // return res.status(200).json({
  //   message: "Order registration completed successfully",
  //   data: req.body,
  // });

  const {
    //order info
    order_id,
    project_name,
    subject,
    parent_ref,
    nhai_hq_letter,
    additional_info,
    due_date,
    nhai_bool,
    parent_ref_bool,
    samples,
    //customers Data
    existing_customer,
    name,
    email,
    mobile,
    gst,
    pan,
    customer_address,
  } = req.body;

  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: "No letter uploaded" });
    }

    const letterFile = req.file;
    const uploadedFile = await uploadWorkOrderFileToS3(letterFile, order_id);
    const client_letter_location = uploadedFile.Location;

    if (existing_customer === "false") {
      console.log("Am inside if");
      const customerObj = {
        name,
        email,
        contact: mobile,
        gst_number: gst,
        pan_number: pan,
        address: customer_address,
      };

      customerInfo = await Customers.create(customerObj, { transaction: t });
      console.log(customerInfo);
    }

    await Orders.update(
      {
        project_name,
        subject,
        parent_ref,
        nhai_hq_letter,
        additional_info,
        due_date,
        nhai_bool,
        parent_ref_bool,
        customer_id: customerInfo.customer_id,
        client_letter: client_letter_location,
      },
      { where: { order_id } },
      { transaction: t }
    );

    for (let eachSample of samples) {
      const {
        source,
        quantity,
        grade,
        brandName,
        week_no,
        ref_code,
        sample_id_optional_field,
        sample_id,
      } = eachSample;

      await SampleMaterials.update(
        {
          source,
          quantity,
          grade,
          brandName,
          week_no,
          ref_code,
          sample_id_optional_field,
        },
        { where: { sample_id } },
        { transaction: t }
      );
    }

    await t.commit();
    return res.status(200).json({
      message: "Order registration completed successfully",
      data: req.body,
    });
  } catch (err) {
    console.log(err);
    await t.rollback();
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCustomersList = async (req, res) => {
  try {
    const customersList = await Customers.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({ data: customersList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSiteUsers = async (req, res) => {
  try {
    const usersList = await User.findAll({
      attributes: ["id", "email", "mobile", "registeredDate"],
      order: [["registeredDate", "DESC"]],
    });

    return res.status(200).json({ data: usersList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addCustomer = async (req, res) => {
  console.log(req.body);
  const { name, customer_address, pan, gst, mobile, email } = req.body;
  console.log(name);

  try {
    const existingCustomer = await Customers.findOne({
      where: { name, pan_number: pan, gst_number: gst, contact: mobile },
    });
    if (existingCustomer) {
      return res.status(500).json({ message: "Customer already exists" });
    }
    const newCustomer = await Customers.create({
      name,
      address: customer_address,
      pan_number: pan,
      gst_number: gst,
      contact: mobile,
      email,
    });

    console.log("customer added successfully");
    return res
      .status(200)
      .json({ message: "Customer added successfully", data: newCustomer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSubscribers = async (req, res) => {
  try {
    const subscribersList = await Subscriber.findAll({
      order: [["subscribed_at", "DESC"]],
    });
    return res.status(200).json({ data: subscribersList });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSubscriberStatisticsMonthly = async (req, res) => {
  try {
    const counts = await Subscriber.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("subscribed_at"), "%m-%Y"),
          "month_year",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("subscribed_at"), "%m-%Y"),
      ],
      order: [[Sequelize.literal("month_year"), "ASC"]],
      raw: true,
    });

    const result = counts.map((count) => ({
      label: count.month_year,
      count: count.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSubscriberStatisticsLast30Days = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const counts = await Subscriber.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DATE_FORMAT",
            Sequelize.col("subscribed_at"),
            "%Y-%m-%d"
          ),
          "day",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      where: {
        subscribed_at: {
          [Sequelize.Op.gte]: thirtyDaysAgo,
        },
      },
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("subscribed_at"), "%Y-%m-%d"),
      ],
      order: [[Sequelize.literal("day"), "ASC"]],
      limit: 30,
      raw: true,
    });

    const result = counts.map((count) => ({
      label: count.day,
      count: count.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLast30CustomerCounts = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30Customers = await Customers.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m-%d"),
          "day",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      where: {
        created_at: {
          [Sequelize.Op.gte]: thirtyDaysAgo,
        },
      },
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m-%d"),
      ],
      order: [[Sequelize.literal("day"), "DESC"]],
      limit: 30,
      raw: true,
    });

    const result = last30Customers.map((customer) => ({
      label: customer.day,
      count: customer.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCustomerStatisticsMonthly = async (req, res) => {
  try {
    const customerCounts = await Customers.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%m-%Y"),
          "month_year",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%m-%Y"),
      ],
      order: [[Sequelize.literal("month_year"), "ASC"]],
      raw: true,
    });

    const result = customerCounts.map((customerCount) => ({
      label: customerCount.month_year,
      count: customerCount.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLast30DaysOrderCounts = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const last30Orders = await Orders.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m-%d"),
          "day",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      where: {
        created_at: {
          [Sequelize.Op.gte]: thirtyDaysAgo,
        },
      },
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m-%d"),
      ],
      order: [[Sequelize.literal("day"), "ASC"]],
      raw: true,
    });

    const result = last30Orders.map((order) => ({
      label: order.day,
      count: order.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderStatisticsMonthly = async (req, res) => {
  try {
    const orderCounts = await Orders.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%m-%Y"),
          "month_year",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%m-%Y"),
      ],
      order: [[Sequelize.literal("month_year"), "ASC"]],
      raw: true,
    });

    const result = orderCounts.map((orderCount) => ({
      label: orderCount.month_year,
      count: orderCount.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductSampleCounts = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.name, 
        p.image, 
        COUNT(sm.product_id) AS count
      FROM 
        products p
      JOIN 
        sample_materials sm
      ON 
        p.id = sm.product_id
      GROUP BY 
        p.id
      ORDER BY 
        count DESC
    `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return res.status(200).json({ data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDisciplineWise = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.discipline as name,
        COUNT(sp.param_id) AS value
      FROM 
        sample_params sp
      JOIN 
        params p ON sp.param_id = p.param_id
      GROUP BY 
        p.discipline
     
    `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return res.status(200).json({ data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOnlineUsersMonthly = async (req, res) => {
  try {
    const onlineUsers = await User.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("registeredDate"), "%m-%Y"),
          "month_year",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      group: [
        Sequelize.fn("DATE_FORMAT", Sequelize.col("registeredDate"), "%m-%Y"),
      ],
      order: [[Sequelize.literal("month_year"), "ASC"]],
      raw: true,
    });

    const result = onlineUsers.map((eachUser) => ({
      label: eachUser.month_year,
      count: eachUser.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOnlineUsersDaily = async (req, res) => {
  try {
    const last30Users = await User.findAll({
      attributes: ["registeredDate"],
      order: [["registeredDate", "ASC"]],
      limit: 30,
      raw: true,
    });

    const registrationDates = last30Users.map((user) => user.registeredDate);

    const dailyCounts = await User.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DATE_FORMAT",
            Sequelize.col("registeredDate"),
            "%Y-%m-%d"
          ),
          "day",
        ],
        [Sequelize.fn("COUNT", "*"), "count"],
      ],
      where: {
        registeredDate: {
          [Sequelize.Op.in]: registrationDates,
        },
      },
      group: [
        Sequelize.fn(
          "DATE_FORMAT",
          Sequelize.col("registeredDate"),
          "%Y-%m-%d"
        ),
      ],
      order: [[Sequelize.literal("day"), "DESC"]],
      raw: true,
      limit: 30,
    });

    const result = dailyCounts.map((record) => ({
      label: record.day,
      count: record.count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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

  //client-requests
  getRequestCallbacks,
  uploadCustomerRequestAudio,

  //ecommerce-orders
  getAllEcommerceOrders,
  completeEcommerceOrderRegistration,
  getCustomersList,
  addCustomer,
  getSubscribers,

  //website users
  getSiteUsers,

  // graphs
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
};
