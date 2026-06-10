const express = require("express");

const router = express.Router();

const {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  getDealsByLead
} = require("../controllers/dealController");

// CREATE DEAL
router.post("/", createDeal);

// GET ALL DEALS
router.get("/", getDeals);


router.get(
  "/lead/:leadId",
  getDealsByLead
);
// GET SINGLE DEAL
router.get("/:id", getDealById);

// UPDATE DEAL
router.put("/:id", updateDeal);

// DELETE DEAL
router.delete("/:id", deleteDeal);


module.exports = router;