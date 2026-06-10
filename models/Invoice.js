const mongoose = require("mongoose");

const invoiceSchema =
  new mongoose.Schema(
    {
      invoiceNumber: {
        type: String,
        required: true,
        unique: true,
      },

      orderId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },

      dispatchId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Dispatch",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      paidAmount: {
        type: Number,
        default: 0,
      },

      dueAmount: {
        type: Number,
        default: 0,
      },

      dueDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: [
          "UNPAID",
          "PARTIALLY_PAID",
          "PAID",
          "OVERDUE",
        ],
        default: "UNPAID",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Invoice",
    invoiceSchema
  );