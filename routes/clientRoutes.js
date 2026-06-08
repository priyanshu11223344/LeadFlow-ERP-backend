const express = require("express");

const {
  getClients,
} = require("../controllers/clientController");

const router = express.Router();

// GET ALL CLIENTS
router.get("/", getClients);

module.exports = router;