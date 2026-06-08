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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

