const mongoose = require("mongoose");

const grnItemSchema =
  new mongoose.Schema(
    {
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

      orderedQuantity: {
        type: Number,
        required: true,
      },

      receivedQuantity: {
        type: Number,
        required: true,
      },
    },
    { _id: false }
  );

const grnSchema =
  new mongoose.Schema(
    {
      grnNumber: {
        type: String,
        required: true,
        unique: true,
      },

      vendorPurchaseOrderId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          "VendorPurchaseOrder",
        required: true,
      },

      items: [grnItemSchema],

      status: {
        type: String,
        enum: [
          "PARTIALLY_RECEIVED",
          "RECEIVED",
        ],
        default:
          "PARTIALLY_RECEIVED",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "GRN",
    grnSchema
  );