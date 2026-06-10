const express = require("express");

const {
  createVendor,
  getVendors,
  getVendorById,
} = require(
  "../controllers/vendorController"
);

const router = express.Router();

router.post(
  "/",
  createVendor
);

router.get(
  "/",
  getVendors
);

router.get(
  "/:id",
  getVendorById
);

module.exports = router;