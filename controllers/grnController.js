const {
    createGRNService,
    getGRNsService,
    getGRNByIdService,
  } = require(
    "../services/grnServices"
  );
  const {
    createAuditLog,
  } = require(
    "../services/auditLogService"
  );
  const createGRN =
    async (req, res) => {
      try {
        const grn =
  await createGRNService(
    req.body
  );

await createAuditLog({
  user: req.user,

  module: "GRN",

  action: "CREATE",

  description:
    `Created GRN ${grn.grnNumber}`,
});
  
        res.status(201).json({
          success: true,
          data: grn,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getGRNs =
    async (req, res) => {
      try {
        const grns =
          await getGRNsService();
  
        res.status(200).json({
          success: true,
          data: grns,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getGRNById =
    async (req, res) => {
      try {
        const grn =
          await getGRNByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: grn,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createGRN,
    getGRNs,
    getGRNById,
  };