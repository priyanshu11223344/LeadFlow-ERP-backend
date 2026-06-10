const mongoose = require("mongoose");

const paymentSchema =
  new mongoose.Schema(
    {
      paymentNumber: {
        type: String,
        required: true,
        unique: true,
      },

      invoiceId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: [
          "CASH",
          "BANK_TRANSFER",
          "UPI",
          "CHEQUE",
        ],
        default:
          "BANK_TRANSFER",
      },

      referenceNumber: {
        type: String,
      },

      paymentDate: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Payment",
    paymentSchema
  );