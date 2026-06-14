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
  createInventory,
  getInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} = require(
  "../controllers/inventoryController"
);

const router =
  express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "INVENTORY_MANAGER"
  ),
  createInventory
);

// GET ALL
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "INVENTORY_MANAGER",
    "PROCUREMENT_MANAGER",
    "SALES",
  ),
  getInventory
);

// GET ONE
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "INVENTORY_MANAGER",
    "PROCUREMENT_MANAGER",
    "SALES",
  ),
  getInventoryById
);

// UPDATE
router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "INVENTORY_MANAGER"
  ),
  updateInventory
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN"
  ),
  deleteInventory
);

module.exports =
  router;