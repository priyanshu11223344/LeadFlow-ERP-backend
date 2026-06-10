const {
  createDealService,
  getDealsService,
  getDealByIdService,
  updateDealService,
  deleteDealService,
  getDealsByLeadService,
} = require("../services/dealServices");
const {
  createAuditLog,
} = require(
  "../services/auditLogService"
);
// CREATE DEAL
const createDeal = async (req, res) => {
  try {
    const deal =
  await createDealService(
    req.body
  );

await createAuditLog({
  user: req.user,

  module: "Deals",

  action: "CREATE",

  description:
    `Created deal ${deal.dealName} worth ₹${deal.amount}`,
});

    res.status(201).json({
      success: true,
      message: "Deal created successfully",
      data: deal,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL DEALS
const getDeals = async (req, res) => {
  try {
    const deals = await getDealsService();

    res.status(200).json({
      success: true,
      count: deals.length,
      data: deals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE DEAL
const getDealById = async (req, res) => {
  try {
    const deal = await getDealByIdService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: deal,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE DEAL
const updateDeal = async (req, res) => {
  try {
    const updatedDeal =
  await updateDealService(
    req.params.id,
    req.body
  );

await createAuditLog({
  user: req.user,

  module: "Deals",

  action: "UPDATE",

  description:
    `Updated deal ${updatedDeal.dealName}`,
});
if (
  req.body.status ===
  "won"
) {
  await createAuditLog({
    user: req.user,

    module: "Deals",

    action: "WON",

    description:
      `Deal ${updatedDeal.dealName} marked as won`,
  });
}
if (
  req.body.status ===
  "lost"
) {
  await createAuditLog({
    user: req.user,

    module: "Deals",

    action: "LOST",

    description:
      `Deal ${updatedDeal.dealName} marked as lost`,
  });
}
    res.status(200).json({
      success: true,
      message: "Deal updated successfully",
      data: updatedDeal,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE DEAL
const deleteDeal = async (req, res) => {
  try {
    const deal =
  await getDealByIdService(
    req.params.id
  );

const result =
  await deleteDealService(
    req.params.id
  );

await createAuditLog({
  user: req.user,

  module: "Deals",

  action: "DELETE",

  description:
    `Deleted deal ${deal.dealName}`,
});

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
const getDealsByLead =
  async (req, res) => {
    try {
      const deals =
        await getDealsByLeadService(
          req.params.leadId
        );

      res.status(200).json({
        success: true,
        data: deals,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  module.exports = {
    createDeal,
    getDeals,
    getDealById,
    updateDeal,
    deleteDeal,
    getDealsByLead,
  };