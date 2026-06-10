const express =
  require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const {
  createDispatch,
  getDispatches,
  getDispatchById,
} = require(
  "../controllers/dispatchController"
);

const router =
  express.Router();

// CREATE DISPATCH
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "INVENTORY_MANAGER"
  ),
  createDispatch
);

// GET ALL DISPATCHES
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "INVENTORY_MANAGER",
    "SALES",
    "FINANCE"
  ),
  getDispatches
);

// GET DISPATCH BY ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "INVENTORY_MANAGER",
    "SALES",
    "FINANCE"
  ),
  getDispatchById
);

module.exports =
  router;