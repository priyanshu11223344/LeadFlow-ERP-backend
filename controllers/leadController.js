const {
    createLeadService,
    getLeadsService,
    updateLeadService,
  } = require("../services/leadServices");
  const {
    createAuditLog,
  } = require(
    "../services/auditLogService"
  );
  // CREATE LEAD
  const createLead = async (req, res) => {
    try {
      const result =
  await createLeadService(
    req.body
  );

await createAuditLog({
  user: req.user,

  module: "Leads",

  action: "CREATE",

  description:
    `Created lead ${result.name}`,
});
  
      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // GET ALL LEADS
  const getLeads = async (req, res) => {
    try {
      const leads = await getLeadsService();
  
      res.status(200).json({
        success: true,
        message: "Leads fetched successfully",
        data: leads,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  // UPDATE LEAD
  const updateLead = async (req, res) => {
    try {
      const updatedLead =
  await updateLeadService(
    req.params.id,
    req.body
  );

await createAuditLog({
  user: req.user,

  module: "Leads",

  action: "UPDATE",

  description:
    `Updated lead ${updatedLead.name}`,
});
if (
  updatedLead.leadStage ===
  "Won"
) {
  await createAuditLog({
    user: req.user,

    module: "Leads",

    action: "WON",

    description:
      `Lead ${updatedLead.name} converted to client`,
  });
}

if (
  updatedLead.leadStage ===
  "Lost"
) {
  await createAuditLog({
    user: req.user,

    module: "Leads",

    action: "LOST",

    description:
      `Lead ${updatedLead.name} marked as lost`,
  });
}
  
      res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: updatedLead,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    createLead,
    getLeads,
    updateLead,
  };