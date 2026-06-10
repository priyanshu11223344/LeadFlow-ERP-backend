const {
  createVendorService,
  getVendorsService,
  getVendorByIdService,
} = require(
  "../services/vendorServices"
);
const {
  createAuditLog,
} = require(
  "../services/auditLogService"
);
const createVendor =
  async (req, res) => {
    try {
      const vendor =
        await createVendorService(
          req.body
        );

      await createAuditLog({
        user: req.user,

        module: "Vendors",

        action: "CREATE",

        description:
          `Created vendor ${vendor.vendorName}`,
      });
      res.status(201).json({
        success: true,
        data: vendor,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

const getVendors =
  async (req, res) => {
    try {
      const vendors =
        await getVendorsService();

      res.status(200).json({
        success: true,
        data: vendors,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const getVendorById =
  async (req, res) => {
    try {
      const vendor =
        await getVendorByIdService(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: vendor,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
};