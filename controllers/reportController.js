const {
    getSalesReportService,
    getInventoryReportService,
    getProcurementReportService,
    getRevenueReportService,
  } = require(
    "../services/reportServices"
  );
  
  // SALES REPORT
  const getSalesReport =
    async (req, res) => {
      try {
        const report =
          await getSalesReportService();
  
        res.status(200).json({
          success: true,
          data: report,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // INVENTORY REPORT
  const getInventoryReport =
    async (req, res) => {
      try {
        const report =
          await getInventoryReportService();
  
        res.status(200).json({
          success: true,
          data: report,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // PROCUREMENT REPORT
  const getProcurementReport =
    async (req, res) => {
      try {
        const report =
          await getProcurementReportService();
  
        res.status(200).json({
          success: true,
          data: report,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // REVENUE REPORT
  const getRevenueReport =
    async (req, res) => {
      try {
        const report =
          await getRevenueReportService();
  
        res.status(200).json({
          success: true,
          data: report,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    getSalesReport,
    getInventoryReport,
    getProcurementReport,
    getRevenueReport,
  };