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
      
      dispatchedQuantity: {
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
      dealId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Deal",
      },
      items: [orderItemSchema],

      totalAmount: {
        type: Number,
        default: 0,
      },
      quotationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quotation",
      },
      
      subTotal: {
        type: Number,
        default: 0,
      },
      
      totalDiscount: {
        type: Number,
        default: 0,
      },
      
      totalTax: {
        type: Number,
        default: 0,
      },
      
      grandTotal: {
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
          "PARTIALLY_DISPATCHED",
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