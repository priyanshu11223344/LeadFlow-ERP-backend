const express =
  require("express");

const router =
  express.Router();

const {
  getAuditLogs,
} = require(
  "../controllers/auditLogController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN"
  ),
  getAuditLogs
);

module.exports =
  router;