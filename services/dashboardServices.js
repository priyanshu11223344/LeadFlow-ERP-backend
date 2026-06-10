const Lead = require("../models/Lead");
const Deal = require("../models/Deal");
const Client = require("../models/Client");
const Order = require("../models/Order");
const Vendor = require("../models/Vendor");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Inventory = require("../models/Inventory");

const getDashboardSummaryService =
  async () => {
    const [
      totalLeads,
      totalDeals,
      totalClients,
      totalOrders,
      totalVendors,
      totalInvoices,
      lowStockItems,
      invoices,
    ] = await Promise.all([
      Lead.countDocuments(),
      Deal.countDocuments(),
      Client.countDocuments(),
      Order.countDocuments(),
      Vendor.countDocuments(),
      Invoice.countDocuments(),
      Inventory.countDocuments({
        status: {
          $in: [
            "LOW_STOCK",
            "OUT_OF_STOCK",
            "TO_BE_ORDERED",
          ],
        },
      }),
      Invoice.find(),
    ]);

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
      totalLeads,
      totalDeals,
      totalClients,

      totalOrders,
      totalVendors,

      totalInvoices,

      totalRevenue,
      receivedRevenue,
      pendingRevenue,

      lowStockItems,
    };
  };

module.exports = {
  getDashboardSummaryService,
};