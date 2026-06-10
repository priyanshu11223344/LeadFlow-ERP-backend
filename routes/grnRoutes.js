const express = require("express");

const {
  createGRN,
  getGRNs,
  getGRNById,
} = require(
  "../controllers/grnController"
);

const router = express.Router();

router.post(
  "/",
  createGRN
);

router.get(
  "/",
  getGRNs
);

router.get(
  "/:id",
  getGRNById
);

module.exports = router;