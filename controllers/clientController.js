const Client = require("../models/Client");

// GET ALL CLIENTS
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      data: clients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getClients,
};