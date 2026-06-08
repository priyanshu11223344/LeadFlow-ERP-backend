const mongoose = require("mongoose");

const orderItemSchema =
  new mongoose.Schema(
    {
      inventoryId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
      },

      itemName: {
        type: String,
        required: true,
      },

      sku: {
        type: String,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      allocatedQuantity: {
        type: Number,
        default: 0,
      },

      price: {
        type: Number,
        default: 0,
      },
    },
    { _id: false }
  );

const orderSchema =
  new mongoose.Schema(
    {
      poNumber: {
        type: String,
        required: true,
        unique: true,
      },

      clientId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
      },

      items: [orderItemSchema],

      totalAmount: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "ALLOCATED",
          "PARTIALLY_ALLOCATED",
          "PENDING_PROCUREMENT",
          "READY_TO_DELIVER",
          "DELIVERED",
          "COMPLETED",
        ],
        default: "PENDING",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model("Order", orderSchema);