const express = require("express");

const {
  createInventory,
  getInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} = require(
  "../controllers/inventoryController"
);

const router = express.Router();

// CREATE
router.post("/", createInventory);

// GET ALL
router.get("/", getInventory);

// GET ONE
router.get("/:id", getInventoryById);

// UPDATE
router.patch("/:id", updateInventory);

// DELETE
router.delete("/:id", deleteInventory);

module.exports = router;