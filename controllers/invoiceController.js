const {
    createInvoiceService,
    getInvoicesService,
    getInvoiceByIdService,
  } = require(
    "../services/invoiceServices"
  );
  const {
    createAuditLog,
  } = require(
    "../services/auditLogService"
  );
  const createInvoice =
    async (req, res) => {
      try {
        const invoice =
        await createInvoiceService(
          req.body
        );
      
      await createAuditLog({
        user: req.user,
      
        module: "Invoices",
      
        action: "CREATE",
      
        description:
          `Created invoice ${invoice.invoiceNumber} worth ₹${invoice.amount}`,
      });
  
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