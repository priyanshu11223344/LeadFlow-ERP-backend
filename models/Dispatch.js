const mongoose = require("mongoose");

const dispatchItemSchema =
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
    },
    { _id: false }
  );

const dispatchSchema =
  new mongoose.Schema(
    {
      dispatchNumber: {
        type: String,
        unique: true,
        required: true,
      },

      orderId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },

      items: [
        dispatchItemSchema,
      ],

      trackingNumber: {
        type: String,
      },

      transporter: {
        type: String,
      },

      dispatchDate: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "DISPATCHED",
          "DELIVERED",
        ],
        default: "DISPATCHED",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Dispatch",
    dispatchSchema
  );