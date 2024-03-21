const { Callback } = require("../models/index");

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

module.exports = {
  createCallbackRequest,
};
