const GRN = require("../models/GRN");
const Inventory = require("../models/Inventory");
const PurchaseRequisition = require("../models/PurchaseRequisition");
const VendorPurchaseOrder = require("../models/VendorPurchaseOrder");
const Order = require("../models/Order");
// Generate GRN Number
const generateGRNNumber =
  async () => {
    const count =
      await GRN.countDocuments();

    return `GRN-${String(
      count + 1
    ).padStart(5, "0")}`;
  };

// CREATE GRN
const createGRNService =
  async (payload) => {
    const {
      vendorPurchaseOrderId,
      items,
    } = payload;

    const po =
      await VendorPurchaseOrder.findById(
        vendorPurchaseOrderId
      );

    if (!po) {
      throw new Error(
        "Vendor Purchase Order not found"
      );
    }

    let fullyReceived = true;

    for (const item of items) {
      const inventory =
        await Inventory.findById(
          item.inventoryId
        );

      if (!inventory) {
        throw new Error(
          `Inventory item not found`
        );
      }

      // Increase stock
      inventory.quantity +=
        item.receivedQuantity;

      if (
        inventory.quantity === 0
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

      await inventory.save();

      // Update requisitions
      const requisitions =
        await PurchaseRequisition.find({
          inventoryId:
            item.inventoryId,
          status: {
            $in: [
              "PENDING",
              "PARTIALLY_PROCURED",
            ],
          },
        });

      let remainingReceived =
        item.receivedQuantity;

      for (const req of requisitions) {
        if (
          remainingReceived <= 0
        )
          break;

        const remainingNeed =
          req.requiredQuantity -
          req.procuredQuantity;

        const allocated =
          Math.min(
            remainingNeed,
            remainingReceived
          );

        req.procuredQuantity +=
          allocated;

        remainingReceived -=
          allocated;

        if (
          req.procuredQuantity >=
          req.requiredQuantity
        ) {
          req.status =
            "PROCURED";
        } else {
          req.status =
            "PARTIALLY_PROCURED";
        }

        await req.save();
      }

      if (
        item.receivedQuantity <
        item.orderedQuantity
      ) {
        fullyReceived =
          false;
      }
    }

    const grnNumber =
      await generateGRNNumber();

    const grn =
      await GRN.create({
        grnNumber,
        vendorPurchaseOrderId,
        items,
        status:
          fullyReceived
            ? "RECEIVED"
            : "PARTIALLY_RECEIVED",
      });

      po.status =
      fullyReceived
        ? "RECEIVED"
        : "PARTIALLY_RECEIVED";
    
    await po.save();
    
    // =================================
    // REALLOCATE PENDING ORDERS
    // =================================
    
    const pendingOrders =
      await Order.find({
        status: {
          $in: [
            "PENDING_PROCUREMENT",
            "PARTIALLY_ALLOCATED",
          ],
        },
      });
    
    for (const order of pendingOrders) {
      let fullyAllocated = true;
      let anyAllocated = false;
    
      for (const item of order.items) {
        const shortage =
          item.quantity -
          item.allocatedQuantity;
    
        if (shortage <= 0)
          continue;
    
        const inventory =
          await Inventory.findById(
            item.inventoryId
          );
    
        if (!inventory) {
          fullyAllocated = false;
          continue;
        }
    
        if (
          inventory.quantity >=
          shortage
        ) {
          inventory.quantity -=
            shortage;
    
          item.allocatedQuantity +=
            shortage;
    
          anyAllocated = true;
    
          if (
            inventory.quantity === 0
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
    
          await inventory.save();
        } else if (
          inventory.quantity > 0
        ) {
          item.allocatedQuantity +=
            inventory.quantity;
    
          inventory.quantity = 0;
    
          inventory.status =
            "OUT_OF_STOCK";
    
          anyAllocated = true;
          fullyAllocated = false;
    
          await inventory.save();
        } else {
          fullyAllocated = false;
        }
      }
    
      if (fullyAllocated) {
        order.status =
          "ALLOCATED";
      } else if (
        anyAllocated
      ) {
        order.status =
          "PARTIALLY_ALLOCATED";
      }
    
      await order.save();
    }
    
    return grn;

    return grn;
  };

// GET ALL
const getGRNsService =
  async () => {
    return await GRN.find()
      .populate(
        "vendorPurchaseOrderId"
      )
      .sort({
        createdAt: -1,
      });
  };

// GET BY ID
const getGRNByIdService =
  async (id) => {
    const grn =
      await GRN.findById(id)
        .populate(
          "vendorPurchaseOrderId"
        );

    if (!grn) {
      throw new Error(
        "GRN not found"
      );
    }

    return grn;
  };

module.exports = {
  createGRNService,
  getGRNsService,
  getGRNByIdService,
};