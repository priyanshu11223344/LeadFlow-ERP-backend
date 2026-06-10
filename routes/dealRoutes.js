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

const router =
  express.Router();

const {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  getDealsByLead,
} = require(
  "../controllers/dealController"
);

// CREATE DEAL
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  createDeal
);

// GET ALL DEALS
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  getDeals
);

// GET DEALS BY LEAD
router.get(
  "/lead/:leadId",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  getDealsByLead
);

// GET SINGLE DEAL
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  getDealById
);

// UPDATE DEAL
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  updateDeal
);

// DELETE DEAL
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN"
  ),
  deleteDeal
);

module.exports =
  router;