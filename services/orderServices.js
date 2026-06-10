const Order = require("../models/Order");
const Client = require("../models/Client");
const Inventory = require("../models/Inventory");
const PurchaseRequisition =
  require(
    "../models/PurchaseRequisition"
  );
  const createOrderService =
  async (payload) => {
    const {
      clientId,
      dealId,
      poNumber,
      items,
    } = payload;

    const client =
      await Client.findById(clientId);

    if (!client) {
      throw new Error(
        "Client not found"
      );
    }

    let totalAmount = 0;

    let orderStatus =
      "ALLOCATED";

    const processedItems = [];

    for (const orderItem of items) {
      let inventory =
        await Inventory.findOne({
          sku: orderItem.sku,
        });

      // ITEM NOT FOUND
      if (!inventory) {
        inventory =
          await Inventory.create({
            itemName:
              orderItem.itemName,
            sku:
              orderItem.sku,
            quantity: 0,
            minQuantity: 0,
            price:
              orderItem.price,
            status:
              "TO_BE_ORDERED",
          });

        orderStatus =
          "PENDING_PROCUREMENT";

        processedItems.push({
          inventoryId:
            inventory._id,
          itemName:
            inventory.itemName,
          sku: inventory.sku,
          quantity:
            orderItem.quantity,
          allocatedQuantity: 0,
          price:
            orderItem.price,
        });

        totalAmount +=
          orderItem.quantity *
          orderItem.price;

        continue;
      }

      const available =
        inventory.quantity;

      const requested =
        orderItem.quantity;

      let allocated = 0;

      // FULL ALLOCATION
      if (
        available >= requested
      ) {
        allocated = requested;

        inventory.quantity -=
          requested;
      }

      // PARTIAL ALLOCATION
      else if (
        available > 0
      ) {
        allocated = available;

        inventory.quantity = 0;

        orderStatus =
          "PARTIALLY_ALLOCATED";
      }

      // NO STOCK
      else {
        allocated = 0;

        orderStatus =
          "PENDING_PROCUREMENT";
      }

      // UPDATE INVENTORY STATUS
      if (
        inventory.status !==
        "TO_BE_ORDERED"
      ) {
        if (
          inventory.quantity ===
          0
        ) {
          inventory.status =
            "OUT_OF_STOCK";
        } else if (
          inventory.quantity <=
          inventory.minQuantity
        ) {
          inventory.status =
            "LOW_STOCK";
        } else {
          inventory.status =
            "IN_STOCK";
        }
      }

      await inventory.save();

      processedItems.push({
        inventoryId:
          inventory._id,
        itemName:
          inventory.itemName,
        sku:
          inventory.sku,
        quantity:
          requested,
        allocatedQuantity:
          allocated,
        price:
          orderItem.price,
      });

      totalAmount +=
        requested *
        orderItem.price;
    }

    // CREATE ORDER
    const order =
  await Order.create({
    poNumber,
    clientId,
    dealId,
    items: processedItems,
    totalAmount,
    status: orderStatus,
  });

    // CREATE PURCHASE REQUISITIONS
    for (const item of processedItems) {
      const shortage =
        item.quantity -
        item.allocatedQuantity;

      if (shortage > 0) {
        await PurchaseRequisition.create({
          orderId: order._id,
          inventoryId:
            item.inventoryId,
          itemName:
            item.itemName,
          sku: item.sku,
          requiredQuantity:
            shortage,
        });
      }
    }

    return order;
  };
  const getOrdersService =
  async () => {
    return await Order.find()
      .populate("clientId")
      .populate("dealId")
      .sort({
        createdAt: -1,
      });
  };
  const getOrderByIdService =
  async (id) => {
    const order =
      await Order.findById(id)
        .populate("clientId")
        .populate("dealId")

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    return order;
  };
  module.exports = {
    createOrderService,
    getOrdersService,
    getOrderByIdService,
  };