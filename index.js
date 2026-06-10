const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/deals", require("./routes/dealRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use(
  "/api/inventory",
  require("./routes/inventoryRoutes")
);
app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);
const vendorRoutes =
  require(
    "./routes/vendorRoutes"
  );

app.use(
  "/api/vendors",
  vendorRoutes
);
const purchaseRequisitionRoutes =
  require(
    "./routes/purchaseRequisitionRoutes"
  );

app.use(
  "/api/purchase-requisitions",
  purchaseRequisitionRoutes
);
const vendorPurchaseOrderRoutes =
  require(
    "./routes/vendorPurchaseOrderRoutes"
  );

app.use(
  "/api/vendor-purchase-orders",
  vendorPurchaseOrderRoutes
);
const grnRoutes =
  require("./routes/grnRoutes");

app.use(
  "/api/grn",
  grnRoutes
);
const dispatchRoutes =
  require(
    "./routes/dispatchRoutes"
  );

app.use(
  "/api/dispatch",
  dispatchRoutes
);
const invoiceRoutes =
  require(
    "./routes/invoiceRoutes"
  );

app.use(
  "/api/invoices",
  invoiceRoutes
);
const paymentRoutes =
  require(
    "./routes/paymentRoutes"
  );

app.use(
  "/api/payments",
  paymentRoutes
);
const dashboardRoutes =
  require(
    "./routes/dashboardRoutes"
  );

app.use(
  "/api/dashboard",
  dashboardRoutes
);
const reportRoutes =
  require(
    "./routes/reportRoutes"
  );

app.use(
  "/api/reports",
  reportRoutes
);
const userRoutes =
  require(
    "./routes/userRoutes"
  );

app.use(
  "/api/users",
  userRoutes
);
const authRoutes =
  require(
    "./routes/authRoutes"
  );

app.use(
  "/api/auth",
  authRoutes
);
const auditLogRoutes =
  require(
    "./routes/auditLogRoutes"
  );

app.use(
  "/api/audit-logs",
  auditLogRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

