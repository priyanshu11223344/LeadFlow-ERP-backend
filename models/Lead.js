const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    salutation: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    leadStage: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Proposal",
        "Negotiation",
        "Won",
        "Lost",
        "Dead",
      ],
      default: "New",
    },

    leadSource: {
      type: String,
      trim: true,
    },

    leadOwner: {
      type: String,
      trim: true,
    },

    createDeal: {
      type: Boolean,
      default: false,
    },

    autoConvertToClient: {
      type: Boolean,
      default: false,
    },

    companyName: {
      type: String,
      trim: true,
    },
    remark:{
      type:String,
      trim:true,
    },
    address: {
      type: String,
      trim: true,
    },

    dealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
    },

    status: {
      type: String,
      enum: ["active", "converted", "lost"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);