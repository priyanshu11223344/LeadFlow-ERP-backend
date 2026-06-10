const mongoose = require("mongoose");

const purchaseRequisitionSchema =
  new mongoose.Schema(
    {
      orderId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },

      inventoryId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true,
      },

      itemName: {
        type: String,
        required: true,
      },

      sku: {
        type: String,
        required: true,
      },

      requiredQuantity: {
        type: Number,
        required: true,
      },

      procuredQuantity: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "PARTIALLY_PROCURED",
          "PROCURED",
          "CANCELLED",
        ],
        default: "PENDING",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "PurchaseRequisition",
  purchaseRequisitionSchema
);