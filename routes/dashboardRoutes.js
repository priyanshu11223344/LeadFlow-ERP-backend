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
  getDashboardSummary,
} = require(
  "../controllers/dashboardController"
);

const router = express.Router();

router.get(
  "/summary",
  getDashboardSummary
);

module.exports = router;