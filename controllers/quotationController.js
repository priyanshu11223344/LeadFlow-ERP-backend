const {
    createQuotationService,
    getQuotationsService,
    getQuotationByIdService,
    updateQuotationStatusService,
    convertQuotationToDealService,
  } = require(
    "../services/quotationServices"
  );
  
  const {
    createAuditLog,
  } = require(
    "../services/auditLogService"
  );
  
  // CREATE QUOTATION
  
  const createQuotation =
    async (req, res) => {
      try {
        const quotation =
          await createQuotationService(
            req.body
          );
  
        await createAuditLog({
          user: req.user,
  
          module: "Quotations",
  
          action: "CREATE",
  
          description:
            `Created quotation ${quotation.quotationNumber}`,
        });
  
        res.status(201).json({
          success: true,
          message:
            "Quotation created successfully",
          data: quotation,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // GET ALL
  
  const getQuotations =
    async (req, res) => {
      try {
        const quotations =
          await getQuotationsService();
  
        res.status(200).json({
          success: true,
          count:
            quotations.length,
          data: quotations,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // GET BY ID
  
  const getQuotationById =
    async (req, res) => {
      try {
        const quotation =
          await getQuotationByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: quotation,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // UPDATE STATUS
  
  const updateQuotationStatus =
    async (req, res) => {
      try {
        const quotation =
          await updateQuotationStatusService(
            req.params.id,
            req.body.status
          );
  
        await createAuditLog({
          user: req.user,
  
          module: "Quotations",
  
          action: "STATUS_UPDATE",
  
          description:
            `Quotation ${quotation.quotationNumber} marked as ${quotation.status}`,
        });
  
        res.status(200).json({
          success: true,
          message:
            "Quotation status updated",
          data: quotation,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // CONVERT TO DEAL
  
  const convertQuotationToDeal =
    async (req, res) => {
      try {
        const result =
          await convertQuotationToDealService(
            req.params.id
          );
  
        await createAuditLog({
          user: req.user,
  
          module: "Quotations",
  
          action: "CONVERT",
  
          description:
            `Converted quotation ${result.quotation.quotationNumber} into deal`,
        });
  
        res.status(200).json({
          success: true,
          message:
            "Quotation converted successfully",
          data: result,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createQuotation,
    getQuotations,
    getQuotationById,
    updateQuotationStatus,
    convertQuotationToDeal,
  };