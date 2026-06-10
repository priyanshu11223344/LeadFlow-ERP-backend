const express = require("express");

const {
  getPurchaseRequisitions,
  getPurchaseRequisitionById,
  updatePurchaseRequisition
} = require(
  "../controllers/purchaseRequisitionController"
);

const router = express.Router();

router.get(
  "/",
  getPurchaseRequisitions
);

router.get(
  "/:id",
  getPurchaseRequisitionById
);
router.patch(
    "/:id",
    updatePurchaseRequisition
  );
module.exports = router;