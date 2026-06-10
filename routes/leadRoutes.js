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
  createLead,
  getLeads,
  updateLead,
} = require(
  "../controllers/leadController"
);

const router =
  express.Router();

// CREATE LEAD
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  createLead
);

// GET ALL LEADS
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  getLeads
);

// UPDATE LEAD
router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  updateLead
);

module.exports =
  router;