const express = require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const {
  createInvoice,
  getInvoices,
  getInvoiceById,
} = require(
  "../controllers/invoiceController"
);

const router =
  express.Router();

// CREATE INVOICE
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE",
    "SALES",
  ),
  createInvoice
);

// GET ALL INVOICES
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE",
    "SALES"
  ),
  getInvoices
);

// GET INVOICE BY ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE",
    "SALES"
  ),
  getInvoiceById
);

module.exports =
  router;