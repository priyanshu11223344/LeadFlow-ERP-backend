const Dispatch = require("../models/Dispatch");
const Order = require("../models/Order");

// Generate Dispatch Number
const generateDispatchNumber =
  async () => {
    const count =
      await Dispatch.countDocuments();

    return `DSP-${String(
      count + 1
    ).padStart(5, "0")}`;
  };

// CREATE DISPATCH
const createDispatchService =
  async (payload) => {
    const {
      orderId,
      items,
      trackingNumber,
      transporter,
    } = payload;

    const order =
      await Order.findById(orderId);

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    // Validate dispatch quantities
    for (const dispatchItem of items) {
      const orderItem =
        order.items.find(
          (item) =>
            item.sku ===
            dispatchItem.sku
        );

      if (!orderItem) {
        throw new Error(
          `Item ${dispatchItem.sku} not found in order`
        );
      }

      const remainingQty =
        orderItem.allocatedQuantity -
        orderItem.dispatchedQuantity;

      if (
        dispatchItem.quantity >
        remainingQty
      ) {
        throw new Error(
          `Cannot dispatch more than allocated quantity for ${dispatchItem.sku}`
        );
      }

      orderItem.dispatchedQuantity +=
        dispatchItem.quantity;
    }

    // Update Order Status
    let fullyDispatched = true;

    for (const item of order.items) {
      if (
        item.dispatchedQuantity <
        item.allocatedQuantity
      ) {
        fullyDispatched = false;
        break;
      }
    }

    order.status =
      fullyDispatched
        ? "DELIVERED"
        : "PARTIALLY_DISPATCHED";

    await order.save();

    const dispatchNumber =
      await generateDispatchNumber();

    const dispatch =
      await Dispatch.create({
        dispatchNumber,
        orderId,
        items,
        trackingNumber,
        transporter,
      });

    return dispatch;
  };

// GET ALL
const getDispatchesService =
  async () => {
    return await Dispatch.find()
      .populate("orderId")
      .sort({
        createdAt: -1,
      });
  };

// GET BY ID
const getDispatchByIdService =
  async (id) => {
    const dispatch =
      await Dispatch.findById(id)
        .populate("orderId");

    if (!dispatch) {
      throw new Error(
        "Dispatch not found"
      );
    }

    return dispatch;
  };

module.exports = {
  createDispatchService,
  getDispatchesService,
  getDispatchByIdService,
};