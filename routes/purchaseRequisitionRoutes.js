const express = require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const {
  getPurchaseRequisitions,
  getPurchaseRequisitionById,
  updatePurchaseRequisition,
} = require(
  "../controllers/purchaseRequisitionController"
);

const router =
  express.Router();

// GET ALL
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER",
    "INVENTORY_MANAGER"
  ),
  getPurchaseRequisitions
);

// GET BY ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER",
    "INVENTORY_MANAGER"
  ),
  getPurchaseRequisitionById
);

// UPDATE
router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  updatePurchaseRequisition
);

module.exports =
  router;