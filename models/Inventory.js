const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  { 
   
    
    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    minQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    category: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "IN_STOCK",
        "LOW_STOCK",
        "OUT_OF_STOCK",
        "TO_BE_ORDERED",
      ],
      default: "IN_STOCK",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);