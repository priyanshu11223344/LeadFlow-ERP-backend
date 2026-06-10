const mongoose = require("mongoose");

const vendorPOItemSchema =
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

      quantity: {
        type: Number,
        required: true,
      },

      unitPrice: {
        type: Number,
        default: 0,
      },
    },
    { _id: false }
  );

const vendorPurchaseOrderSchema =
  new mongoose.Schema(
    {
      poNumber: {
        type: String,
        required: true,
        unique: true,
      },

      vendorId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
      },

      requisitionIds: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref:
            "PurchaseRequisition",
        },
      ],

      items: [
        vendorPOItemSchema,
      ],

      totalAmount: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "DRAFT",
          "ORDERED",
          "PARTIALLY_RECEIVED",
          "RECEIVED",
          "CANCELLED",
        ],
        default: "DRAFT",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "VendorPurchaseOrder",
    vendorPurchaseOrderSchema
  );