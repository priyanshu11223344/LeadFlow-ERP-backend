const AuditLog =
  require(
    "../models/AuditLog"
  );

const getAuditLogs =
  async (
    req,
    res
  ) => {
    try {

      const logs =
        await AuditLog.find()
          .sort({
            createdAt:
              -1,
          });

      res.status(200).json({
        success: true,
        data: logs,
      });

    } catch (
      error
    ) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

module.exports = {
  getAuditLogs,
};