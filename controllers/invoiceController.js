const {
    createInvoiceService,
    getInvoicesService,
    getInvoiceByIdService,
  } = require(
    "../services/invoiceServices"
  );
  
  const createInvoice =
    async (req, res) => {
      try {
        const invoice =
          await createInvoiceService(
            req.body
          );
  
        res.status(201).json({
          success: true,
          data: invoice,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getInvoices =
    async (req, res) => {
      try {
        const invoices =
          await getInvoicesService();
  
        res.status(200).json({
          success: true,
          data: invoices,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getInvoiceById =
    async (req, res) => {
      try {
        const invoice =
          await getInvoiceByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: invoice,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
  };