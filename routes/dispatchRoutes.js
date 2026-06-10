const express = require("express");

const {
  createDispatch,
  getDispatches,
  getDispatchById,
} = require(
  "../controllers/dispatchController"
);

const router = express.Router();

router.post(
  "/",
  createDispatch
);

router.get(
  "/",
  getDispatches
);

router.get(
  "/:id",
  getDispatchById
);

module.exports = router;