const Invoice = require("../models/Invoice");
const Inventory = require("../models/Inventory");
const PurchaseRequisition = require("../models/PurchaseRequisition");
const VendorPurchaseOrder = require("../models/VendorPurchaseOrder");

// SALES REPORT
const getSalesReportService =
  async () => {
    const invoices =
      await Invoice.find();

    const totalRevenue =
      invoices.reduce(
        (sum, invoice) =>
          sum + invoice.amount,
        0
      );

    const totalInvoices =
      invoices.length;

    return {
      totalInvoices,
      totalRevenue,
      averageInvoiceValue:
        totalInvoices > 0
          ? totalRevenue /
            totalInvoices
          : 0,
    };
  };

// INVENTORY REPORT
const getInventoryReportService =
  async () => {
    const items =
      await Inventory.find();

    return {
      totalItems:
        items.length,

      lowStockItems:
        items.filter(
          (item) =>
            item.status ===
            "LOW_STOCK"
        ).length,

      outOfStockItems:
        items.filter(
          (item) =>
            item.status ===
            "OUT_OF_STOCK"
        ).length,

      inventoryValue:
        items.reduce(
          (sum, item) =>
            sum +
            item.quantity *
              item.price,
          0
        ),
    };
  };

// PROCUREMENT REPORT
const getProcurementReportService =
  async () => {
    const requisitions =
      await PurchaseRequisition.find();

    const vendorPOs =
      await VendorPurchaseOrder.find();

    return {
      totalRequisitions:
        requisitions.length,

      pendingRequisitions:
        requisitions.filter(
          (req) =>
            req.status ===
            "PENDING"
        ).length,

      totalVendorPOs:
        vendorPOs.length,

      receivedVendorPOs:
        vendorPOs.filter(
          (po) =>
            po.status ===
            "RECEIVED"
        ).length,
    };
  };

// REVENUE REPORT
const getRevenueReportService =
  async () => {
    const invoices =
      await Invoice.find();

    const totalRevenue =
      invoices.reduce(
        (sum, invoice) =>
          sum + invoice.amount,
        0
      );

    const receivedRevenue =
      invoices.reduce(
        (sum, invoice) =>
          sum +
          invoice.paidAmount,
        0
      );

    const pendingRevenue =
      invoices.reduce(
        (sum, invoice) =>
          sum +
          invoice.dueAmount,
        0
      );

    return {
      totalRevenue,
      receivedRevenue,
      pendingRevenue,
    };
  };

module.exports = {
  getSalesReportService,
  getInventoryReportService,
  getProcurementReportService,
  getRevenueReportService,
};