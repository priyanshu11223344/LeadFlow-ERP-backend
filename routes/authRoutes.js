const express =
  require("express");

const {
  login,
} = require(
  "../controllers/authController"
);

const router =
  express.Router();
  const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );
router.post(
  "/login",
  login
);

module.exports =
  router;