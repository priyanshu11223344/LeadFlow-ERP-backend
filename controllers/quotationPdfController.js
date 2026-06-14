const PDFDocument =
  require("pdfkit");

const Quotation =
  require("../models/Quotation");

const downloadQuotationPdf =
  async (req, res) => {
    try {
      const quotation =
        await Quotation.findById(
          req.params.id
        ).populate("leadId");

      if (!quotation) {
        return res.status(404).json({
          success: false,
          message:
            "Quotation not found",
        });
      }

      const doc =
        new PDFDocument({
          margin: 50,
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${quotation.quotationNumber}.pdf`
      );

      doc.pipe(res);

      // HEADER

      doc
        .fontSize(22)
        .text(
          "LEADFLOW ERP",
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(18)
        .text(
          "QUOTATION",
          {
            align: "center",
          }
        );

      doc.moveDown(2);

      // QUOTATION INFO

      doc
        .fontSize(12)
        .text(
          `Quotation No: ${quotation.quotationNumber}`
        );

      doc.text(
        `Status: ${quotation.status}`
      );

      doc.text(
        `Version: ${quotation.version}`
      );

      doc.text(
        `Date: ${new Date(
          quotation.createdAt
        ).toLocaleDateString()}`
      );

      doc.moveDown();

      // CUSTOMER

      doc
        .fontSize(14)
        .text(
          "Customer Details"
        );

      doc.moveDown(0.5);

      doc
        .fontSize(12)
        .text(
          `Lead: ${quotation.leadId?.name || "-"
          }`
        );

      doc.text(
        `Company: ${quotation.leadId?.companyName || "-"
        }`
      );

      doc.moveDown();

      // ITEMS

      doc
        .fontSize(14)
        .text("Items");

      doc.moveDown(0.5);

      quotation.items.forEach(
        (item, index) => {
          doc.text(
            `${index + 1}. ${item.itemName}`
          );

          doc.text(
            `Qty: ${item.quantity}`
          );

          doc.text(
            `Price: ₹${item.unitPrice}`
          );

          doc.text(
            `Discount: ${item.discountPercent}%`
          );

          doc.text(
            `GST: ${item.gstPercent}%`
          );

          doc.text(
            `Total: ₹${item.totalAmount}`
          );

          doc.moveDown();
        }
      );

      // TOTALS

      doc.moveDown();

      doc
        .fontSize(14)
        .text("Summary");

      doc.moveDown(0.5);

      doc.text(
        `Sub Total: ₹${quotation.subTotal}`
      );

      doc.text(
        `Discount: ₹${quotation.totalDiscount}`
      );

      doc.text(
        `Tax: ₹${quotation.totalTax}`
      );

      doc.fontSize(14).text(
        `Grand Total: ₹${quotation.grandTotal}`
      );

      // TERMS

      doc.moveDown(2);

      doc
        .fontSize(14)
        .text(
          "Terms & Conditions"
        );

      doc.moveDown(0.5);

      doc
        .fontSize(12)
        .text(
          quotation.termsAndConditions ||
            "N/A"
        );

      doc.end();
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

module.exports = {
  downloadQuotationPdf,
};