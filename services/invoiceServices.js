const Invoice = require("../models/Invoice");
const Order = require("../models/Order");
const Dispatch = require("../models/Dispatch");

// Generate Invoice Number
const generateInvoiceNumber =
  async () => {
    const count =
      await Invoice.countDocuments();

    return `INV-${String(
      count + 1
    ).padStart(5, "0")}`;
  };

// CREATE INVOICE
const createInvoiceService =
  async (payload) => {
    const {
      orderId,
      dispatchId,
      dueDate,
    } = payload;

    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    const dispatch =
      await Dispatch.findById(
        dispatchId
      );

    if (!dispatch) {
      throw new Error(
        "Dispatch not found"
      );
    }
    const existingInvoice =
    await Invoice.findOne({
      dispatchId,
    });
  
  if (
    existingInvoice
  ) {
    throw new Error(
      "Invoice already exists for this dispatch"
    );
  }
    const invoiceNumber =
      await generateInvoiceNumber();

    const invoice =
      await Invoice.create({
        invoiceNumber,
        orderId,
        dispatchId,
        amount:
  order.grandTotal,

dueAmount:
  order.grandTotal,
        dueDate,
      });

    return invoice;
  };

// GET ALL
const getInvoicesService =
  async () => {
    return await Invoice.find()
      .populate("orderId")
      .populate("dispatchId")
      .sort({
        createdAt: -1,
      });
  };

// GET BY ID
const getInvoiceByIdService =
  async (id) => {
    const invoice =
      await Invoice.findById(id)
        .populate("orderId")
        .populate("dispatchId");

    if (!invoice) {
      throw new Error(
        "Invoice not found"
      );
    }

    return invoice;
  };

module.exports = {
  createInvoiceService,
  getInvoicesService,
  getInvoiceByIdService,
};