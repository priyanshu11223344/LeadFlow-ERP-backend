const {
    createOrderService,
    getOrdersService,
    getOrderByIdService,
  } = require(
    "../services/orderServices"
  );
  const {
    createAuditLog,
  } = require(
    "../services/auditLogService"
  );
  const createOrder =
    async (req, res) => {
      try {
        const order =
  await createOrderService(
    req.body
  );

await createAuditLog({
  user: req.user,

  module: "Orders",

  action: "CREATE",

  description:
  `Created order ${order.poNumber} worth ₹${order.totalAmount}`
});
  
        res.status(201).json({
          success: true,
          message:
            "Order created successfully",
          data: order,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getOrders =
    async (req, res) => {
      try {
        const orders =
          await getOrdersService();
  
        res.status(200).json({
          success: true,
          data: orders,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getOrderById =
    async (req, res) => {
      try {
        const order =
          await getOrderByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: order,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createOrder,
    getOrders,
    getOrderById,
  };