const mongoose =
  require("mongoose");

const auditLogSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      userName: {
        type: String,
      },

      role: {
        type: String,
      },

      module: {
        type: String,
        required: true,
      },

      action: {
        type: String,
        required: true,
      },

      description: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "AuditLog",
    auditLogSchema
  );