const {
  createDealService,
  getDealsService,
  getDealByIdService,
  updateDealService,
  deleteDealService,
} = require("../services/dealServices");

// CREATE DEAL
const createDeal = async (req, res) => {
  try {
    const deal = await createDealService(req.body);

    res.status(201).json({
      success: true,
      message: "Deal created successfully",
      data: deal,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL DEALS
const getDeals = async (req, res) => {
  try {
    const deals = await getDealsService();

    res.status(200).json({
      success: true,
      count: deals.length,
      data: deals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE DEAL
const getDealById = async (req, res) => {
  try {
    const deal = await getDealByIdService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: deal,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE DEAL
const updateDeal = async (req, res) => {
  try {
    const updatedDeal =
      await updateDealService(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Deal updated successfully",
      data: updatedDeal,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE DEAL
const deleteDeal = async (req, res) => {
  try {
    const result =
      await deleteDealService(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};