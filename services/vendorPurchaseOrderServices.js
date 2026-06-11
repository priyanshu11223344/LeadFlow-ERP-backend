const VendorPurchaseOrder = require(
    "../models/VendorPurchaseOrder"
  );
  
  const Vendor = require(
    "../models/Vendor"
  );
  
  const PurchaseRequisition = require(
    "../models/PurchaseRequisition"
  );
  
  // Generate PO Number
  const generatePONumber =
    async () => {
      const count =
        await VendorPurchaseOrder.countDocuments();
  
      return `VPO-${String(
        count + 1
      ).padStart(5, "0")}`;
    };
  
  // CREATE VENDOR PO
  const createVendorPurchaseOrderService =
    async (payload) => {
      const {
        vendorId,
        requisitionIds,
        items,
      } = payload;
  
      const vendor =
        await Vendor.findById(
          vendorId
        );
  
      if (!vendor) {
        throw new Error(
          "Vendor not found"
        );
      }
  
      let totalAmount = 0;
  
      for (const item of items) {
        totalAmount +=
          item.quantity *
          item.unitPrice;
      }
  
      const poNumber =
        await generatePONumber();
  
      const po =
        await VendorPurchaseOrder.create({
          poNumber,
          vendorId,
          requisitionIds,
          items,
          totalAmount,
          status: "ORDERED",
        });
        console.log(
          "REQUISITION IDS:",
          requisitionIds
        );
        await PurchaseRequisition.updateMany(
          {
            _id: {
              $in: requisitionIds,
            },
          },
          {
            status: "PARTIALLY_PROCURED",
          }
        );
  
      return po;
    };
  
  // GET ALL
  const getVendorPurchaseOrdersService =
    async () => {
      return await VendorPurchaseOrder.find()
        .populate("vendorId")
        .populate(
          "requisitionIds"
        )
        .sort({
          createdAt: -1,
        });
    };
  
  // GET BY ID
  const getVendorPurchaseOrderByIdService =
    async (id) => {
      const po =
        await VendorPurchaseOrder.findById(
          id
        )
          .populate("vendorId")
          .populate(
            "requisitionIds"
          );
  
      if (!po) {
        throw new Error(
          "Vendor Purchase Order not found"
        );
      }
  
      return po;
    };
  
  module.exports = {
    createVendorPurchaseOrderService,
    getVendorPurchaseOrdersService,
    getVendorPurchaseOrderByIdService,
  };