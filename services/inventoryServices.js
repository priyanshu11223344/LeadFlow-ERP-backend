const Inventory = require("../models/Inventory");

const getInventoryStatus = (
  quantity,
  minQuantity
) => {
  if (quantity === 0) {
    return "TO_BE_ORDERED";
  }

  if (quantity <= minQuantity) {
    return "LOW_STOCK";
  }

  return "IN_STOCK";
};

// CREATE ITEM
const createInventoryService =
  async (payload) => {
    const existingItem =
      await Inventory.findOne({
        sku: payload.sku.toUpperCase(),
      });

    if (existingItem) {
      throw new Error(
        "Inventory item with this SKU already exists"
      );
    }

    const status = getInventoryStatus(
      payload.quantity || 0,
      payload.minQuantity || 0
    );

    const item = await Inventory.create({
      ...payload,
      sku: payload.sku.toUpperCase(),
      status,
    });

    return item;
  };

// GET ALL ITEMS
const getInventoryService =
  async () => {
    return await Inventory.find().sort({
      createdAt: -1,
    });
  };

// GET SINGLE ITEM
const getInventoryByIdService =
  async (id) => {
    const item =
      await Inventory.findById(id);

    if (!item) {
      throw new Error(
        "Inventory item not found"
      );
    }

    return item;
  };

// UPDATE ITEM
const updateInventoryService =
  async (id, payload) => {
    const item =
      await Inventory.findById(id);

    if (!item) {
      throw new Error(
        "Inventory item not found"
      );
    }

    const allowedFields = [
      "itemName",
      "sku",
      "quantity",
      "minQuantity",
      "price",
      "category",
    ];

    allowedFields.forEach((field) => {
      if (
        payload[field] !== undefined
      ) {
        item[field] =
          payload[field];
      }
    });

    // Automatically update status based on quantity
    item.status =
      getInventoryStatus(
        item.quantity,
        item.minQuantity
      );

    await item.save();

    return item;
  };

// DELETE ITEM
const deleteInventoryService =
  async (id) => {
    const item =
      await Inventory.findById(id);

    if (!item) {
      throw new Error(
        "Inventory item not found"
      );
    }

    await Inventory.findByIdAndDelete(
      id
    );

    return {
      message:
        "Inventory item deleted successfully",
    };
  };

module.exports = {
  createInventoryService,
  getInventoryService,
  getInventoryByIdService,
  updateInventoryService,
  deleteInventoryService,
};