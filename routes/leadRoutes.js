const express = require("express");

const {
  createLead,
  getLeads,
  updateLead,
} = require("../controllers/leadController");

const router = express.Router();

// CREATE LEAD
router.post("/", createLead);

// GET ALL LEADS
router.get("/", getLeads);

// UPDATE LEAD
router.patch("/:id", updateLead);

module.exports = router;