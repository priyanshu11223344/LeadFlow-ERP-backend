const {
    getPurchaseRequisitionsService,
    getPurchaseRequisitionByIdService,
    updatePurchaseRequisitionService,
  } = require(
    "../services/purchaseRequisitionServices"
  );
  const {
    createAuditLog,
  } = require(
    "../services/auditLogService"
  );
  const updatePurchaseRequisition =
    async (req, res) => {
      try {
        const requisition =
        await updatePurchaseRequisitionService(
          req.params.id,
          req.body
        );
      
      await createAuditLog({
        user: req.user,
      
        module: "Purchase Requisitions",
      
        action: "UPDATE",
      
        description:
          `Updated Purchase Requisition ${requisition._id}`,
      });
  
        res.status(200).json({
          success: true,
          data: requisition,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getPurchaseRequisitions =
    async (req, res) => {
      try {
        const requisitions =
          await getPurchaseRequisitionsService();
  
        res.status(200).json({
          success: true,
          data: requisitions,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getPurchaseRequisitionById =
    async (req, res) => {
      try {
        const requisition =
          await getPurchaseRequisitionByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: requisition,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
    module.exports = {
        getPurchaseRequisitions,
        getPurchaseRequisitionById,
        updatePurchaseRequisition,
      };