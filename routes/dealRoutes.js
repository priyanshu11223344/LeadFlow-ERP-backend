const express = require("express");

const router = express.Router();

const {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

// CREATE DEAL
router.post("/", createDeal);

// GET ALL DEALS
router.get("/", getDeals);

// GET SINGLE DEAL
router.get("/:id", getDealById);

// UPDATE DEAL
router.put("/:id", updateDeal);

// DELETE DEAL
router.delete("/:id", deleteDeal);

module.exports = router;