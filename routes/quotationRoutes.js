const express =
  require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const {
  createQuotation,
  getQuotations,
  getQuotationById,
  updateQuotationStatus,
  convertQuotationToDeal,
} = require(
  "../controllers/quotationController"
);
const {
    downloadQuotationPdf,
  } = require(
    "../controllers/quotationPdfController"
  );
const router =
  express.Router();

// CREATE

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  createQuotation
);

// GET ALL

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  getQuotations
);
router.get(
    "/:id/pdf",
    authMiddleware,
    authorizeRoles(
      "ADMIN",
      "SALES"
    ),
    downloadQuotationPdf
  );
// GET BY ID

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  getQuotationById
);

// UPDATE STATUS

router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  updateQuotationStatus
);

// CONVERT TO DEAL

router.post(
  "/:id/convert",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  convertQuotationToDeal
);

module.exports =
  router;