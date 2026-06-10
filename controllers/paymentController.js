const {
    createPaymentService,
    getPaymentsService,
    getPaymentByIdService,
  } = require(
    "../services/paymentServices"
  );
  
  const createPayment =
    async (req, res) => {
      try {
        const payment =
          await createPaymentService(
            req.body
          );
  
        res.status(201).json({
          success: true,
          data: payment,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getPayments =
    async (req, res) => {
      try {
        const payments =
          await getPaymentsService();
  
        res.status(200).json({
          success: true,
          data: payments,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getPaymentById =
    async (req, res) => {
      try {
        const payment =
          await getPaymentByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: payment,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
  };