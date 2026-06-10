const express =
  require("express");

  const {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
  } = require(
    "../controllers/userController"
  );
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

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN"
  ),
  createUser
);

router.get(
    "/",
    authMiddleware,
    authorizeRoles(
      "ADMIN"
    ),
    getUsers
  );
  router.patch(
    "/:id",
    authMiddleware,
    authorizeRoles(
      "ADMIN"
    ),
    updateUser
  );
  
  router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles(
      "ADMIN"
    ),
    deleteUser
  );
module.exports =
  router;