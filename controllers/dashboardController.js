const {
    getDashboardSummaryService,
  } = require(
    "../services/dashboardServices"
  );
  
  const getDashboardSummary =
    async (req, res) => {
      try {
        const summary =
          await getDashboardSummaryService();
  
        res.status(200).json({
          success: true,
          data: summary,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    getDashboardSummary,
  };