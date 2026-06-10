const PurchaseRequisition = require(
    "../models/PurchaseRequisition"
  );
  
  // GET ALL REQUISITIONS
  const getPurchaseRequisitionsService =
    async () => {
      return await PurchaseRequisition.find()
        .populate("orderId")
        .populate("inventoryId")
        .sort({
          createdAt: -1,
        });
    };
  
  // GET REQUISITION BY ID
  const getPurchaseRequisitionByIdService =
    async (id) => {
      const requisition =
        await PurchaseRequisition.findById(
          id
        )
          .populate("orderId")
          .populate("inventoryId");
  
      if (!requisition) {
        throw new Error(
          "Purchase requisition not found"
        );
      }
  
      return requisition;
    };
  
  // UPDATE REQUISITION STATUS
  const updatePurchaseRequisitionService =
    async (id, payload) => {
      const requisition =
        await PurchaseRequisition.findById(
          id
        );
  
      if (!requisition) {
        throw new Error(
          "Purchase requisition not found"
        );
      }
  
      const allowedFields = [
        "procuredQuantity",
        "status",
      ];
  
      allowedFields.forEach(
        (field) => {
          if (
            payload[field] !==
            undefined
          ) {
            requisition[field] =
              payload[field];
          }
        }
      );
  
      await requisition.save();
  
      return requisition;
    };
  
  module.exports = {
    getPurchaseRequisitionsService,
    getPurchaseRequisitionByIdService,
    updatePurchaseRequisitionService,
  };