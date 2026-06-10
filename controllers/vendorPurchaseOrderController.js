const {
    createVendorPurchaseOrderService,
    getVendorPurchaseOrdersService,
    getVendorPurchaseOrderByIdService,
  } = require(
    "../services/vendorPurchaseOrderServices"
  );
  
  const createVendorPurchaseOrder =
    async (req, res) => {
      try {
        const po =
          await createVendorPurchaseOrderService(
            req.body
          );
  
        res.status(201).json({
          success: true,
          data: po,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getVendorPurchaseOrders =
    async (req, res) => {
      try {
        const pos =
          await getVendorPurchaseOrdersService();
  
        res.status(200).json({
          success: true,
          data: pos,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getVendorPurchaseOrderById =
    async (req, res) => {
      try {
        const po =
          await getVendorPurchaseOrderByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: po,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createVendorPurchaseOrder,
    getVendorPurchaseOrders,
    getVendorPurchaseOrderById,
  };