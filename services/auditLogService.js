const AuditLog =
  require(
    "../models/AuditLog"
  );

const createAuditLog =
  async ({
    user,
    module,
    action,
    description,
  }) => {
    try {

      await AuditLog.create({
        userId:
          user?._id,

        userName:
          user?.name,

        role:
          user?.role,

        module,

        action,

        description,
      });

    } catch (
      error
    ) {

      console.log(
        "AUDIT LOG ERROR:",
        error.message
      );

    }
  };

module.exports = {
  createAuditLog,
};