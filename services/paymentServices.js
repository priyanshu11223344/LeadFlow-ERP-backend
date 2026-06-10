const Payment = require(
    "../models/Payment"
  );
  
  const Invoice = require(
    "../models/Invoice"
  );
  
  // Generate Payment Number
  const generatePaymentNumber =
    async () => {
      const count =
        await Payment.countDocuments();
  
      return `PAY-${String(
        count + 1
      ).padStart(5, "0")}`;
    };
  
  // CREATE PAYMENT
  const createPaymentService =
    async (payload) => {
      const {
        invoiceId,
        amount,
        paymentMethod,
        referenceNumber,
      } = payload;
  
      const invoice =
        await Invoice.findById(
          invoiceId
        );
  
      if (!invoice) {
        throw new Error(
          "Invoice not found"
        );
      }
  
      if (
        amount >
        invoice.dueAmount
      ) {
        throw new Error(
          "Payment exceeds due amount"
        );
      }
  
      const paymentNumber =
        await generatePaymentNumber();
  
      const payment =
        await Payment.create({
          paymentNumber,
          invoiceId,
          amount,
          paymentMethod,
          referenceNumber,
        });
  
      invoice.paidAmount +=
        amount;
  
      invoice.dueAmount -=
        amount;
  
      if (
        invoice.dueAmount === 0
      ) {
        invoice.status =
          "PAID";
      } else {
        invoice.status =
          "PARTIALLY_PAID";
      }
  
      await invoice.save();
  
      return payment;
    };
  
  // GET ALL
  const getPaymentsService =
    async () => {
      return await Payment.find()
        .populate("invoiceId")
        .sort({
          createdAt: -1,
        });
    };
  
  // GET BY ID
  const getPaymentByIdService =
    async (id) => {
      const payment =
        await Payment.findById(id)
          .populate("invoiceId");
  
      if (!payment) {
        throw new Error(
          "Payment not found"
        );
      }
  
      return payment;
    };
  
  module.exports = {
    createPaymentService,
    getPaymentsService,
    getPaymentByIdService,
  };