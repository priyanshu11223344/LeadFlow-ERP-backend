const mongoose = require("mongoose");

const quotationItemSchema =
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
        trim: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      unitPrice: {
        type: Number,
        required: true,
      },

      discountPercent: {
        type: Number,
        default: 0,
      },

      discountAmount: {
        type: Number,
        default: 0,
      },

      gstPercent: {
        type: Number,
        default: 18,
      },

      taxableAmount: {
        type: Number,
        default: 0,
      },

      totalAmount: {
        type: Number,
        default: 0,
      },
    },
    { _id: false }
  );
const quotationSchema =
  new mongoose.Schema(
    {
      quotationNumber: {
        type: String,
        required: true,
        unique: true,
      },

      leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true,
      },

      validityDate: {
        type: Date,
      },

      items: [
        quotationItemSchema,
      ],

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

      termsAndConditions: {
        type: String,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "DRAFT",
          "SENT",
          "NEGOTIATION",
          "APPROVED",
          "REJECTED",
          "CONVERTED",
        ],
        default: "DRAFT",
      },

      dealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deal",
      },
      version: {
        type: Number,
        default: 1,
      },
      isFinalVersion: {
        type: Boolean,
        default: false,
      },
      approvedAt: {
        type: Date,
      },
      
      convertedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Quotation",
    quotationSchema
  );