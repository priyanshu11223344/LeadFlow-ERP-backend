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
  createGRN,
  getGRNs,
  getGRNById,
} = require(
  "../controllers/grnController"
);

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  createGRN
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  getGRNs
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  getGRNById
);

module.exports =
  router;