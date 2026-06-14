const Quotation =
  require("../models/Quotation");

const Lead =
  require("../models/Lead");

const Deal =
  require("../models/Deal");

const generateQuotationNumber =
  async () => {
    const count =
      await Quotation.countDocuments();

    return `QT-${String(
      count + 1
    ).padStart(5, "0")}`;
  };

// =====================================
// CREATE QUOTATION
// =====================================

const createQuotationService =
  async (payload) => {
    const {
      leadId,
      items,
      validityDate,
      termsAndConditions,
    } = payload;

    const lead =
      await Lead.findById(
        leadId
      );

    if (!lead) {
      throw new Error(
        "Lead not found"
      );
    }

    // VERSIONING

    const existingQuotations =
      await Quotation.find({
        leadId,
      });

    const version =
      existingQuotations.length + 1;

    let subTotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    const processedItems =
      items.map((item) => {
        const baseAmount =
          item.quantity *
          item.unitPrice;

        const discountAmount =
          baseAmount *
          (
            item.discountPercent || 0
          ) /
          100;

        const taxableAmount =
          baseAmount -
          discountAmount;

        const taxAmount =
          taxableAmount *
          (
            item.gstPercent || 0
          ) /
          100;

        const totalAmount =
          taxableAmount +
          taxAmount;

        subTotal +=
          baseAmount;

        totalDiscount +=
          discountAmount;

        totalTax +=
          taxAmount;

        return {
          ...item,
          discountAmount,
          taxableAmount,
          totalAmount,
        };
      });

    const quotationNumber =
      await generateQuotationNumber();

    const quotation =
      await Quotation.create({
        quotationNumber,
        leadId,
        version,
        items:
          processedItems,
        validityDate,
        termsAndConditions,
        subTotal,
        totalDiscount,
        totalTax,
        grandTotal:
          subTotal -
          totalDiscount +
          totalTax,
      });

    return quotation;
  };

// =====================================
// GET ALL QUOTATIONS
// =====================================

const getQuotationsService =
  async () => {
    return await Quotation.find()
      .populate("leadId")
      .populate("dealId")
      .sort({
        createdAt: -1,
      });
  };

// =====================================
// GET QUOTATION BY ID
// =====================================

const getQuotationByIdService =
  async (id) => {
    const quotation =
      await Quotation.findById(
        id
      )
        .populate("leadId")
        .populate("dealId");

    if (!quotation) {
      throw new Error(
        "Quotation not found"
      );
    }

    return quotation;
  };

// =====================================
// UPDATE STATUS
// =====================================

const updateQuotationStatusService =
  async (
    id,
    status
  ) => {
    const quotation =
      await Quotation.findById(
        id
      );

    if (!quotation) {
      throw new Error(
        "Quotation not found"
      );
    }

    quotation.status =
      status;

    if (
      status ===
      "APPROVED"
    ) {
      quotation.approvedAt =
        new Date();
    }

    await quotation.save();

    return quotation;
  };

// =====================================
// CONVERT TO DEAL
// =====================================

const convertQuotationToDealService =
  async (id) => {
    const quotation =
      await Quotation.findById(
        id
      ).populate("leadId");

    if (!quotation) {
      throw new Error(
        "Quotation not found"
      );
    }

    if (
      quotation.status !==
      "APPROVED"
    ) {
      throw new Error(
        "Only approved quotations can be converted"
      );
    }

    const existingDeal =
      await Deal.findOne({
        leadId:
          quotation.leadId._id,
      });

    if (
      existingDeal
    ) {
      throw new Error(
        "Deal already exists for this lead"
      );
    }

    const deal =
      await Deal.create({
        leadId:
          quotation.leadId._id,

        dealName:
          `${quotation.leadId.companyName} - Quotation Deal`,

        amount:
          quotation.grandTotal,

        status: "open",

        agent:
          quotation.leadId
            .leadOwner,
      });

    // UPDATE QUOTATION

    quotation.status =
      "CONVERTED";

    quotation.dealId =
      deal._id;

    quotation.isFinalVersion =
      true;

    quotation.convertedAt =
      new Date();

    await quotation.save();

    // SAVE DEAL ID INSIDE LEAD

    const lead =
      await Lead.findById(
        quotation.leadId._id
      );

    lead.dealId =
      deal._id;

    await lead.save();

    return {
      quotation,
      deal,
    };
  };
  const getQuotationsByLeadService =
  async (leadId) => {

    return await Quotation.find({
      leadId,
    }).sort({
      createdAt: -1,
    });
  };

module.exports = {
  createQuotationService,
  getQuotationsService,
  getQuotationByIdService,
  updateQuotationStatusService,
  convertQuotationToDealService,
  getQuotationsByLeadService
};