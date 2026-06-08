const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
      index: true,
      unique:true
    },

    dealName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      default: 0,
    },
    agent:{
      type:String,
    },
    closeDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["open", "won", "lost"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deal", dealSchema);