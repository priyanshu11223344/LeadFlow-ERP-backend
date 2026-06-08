const Lead=require("../models/Lead")
const Deal = require("../models/Deal");
const Client = require("../models/Client");

const createLeadService = async (payload) => {
  const {
    createDeal,
    dealName,
    amount,
    closeDate,
    email,
  } = payload;
  let lead;
  // CHECK IF LEAD ALREADY EXISTS
  const existingLead = await Lead.findOne({
    email,
  });

  if (existingLead) {
   lead=existingLead
  }

  // CREATE LEAD
  else{
    lead=await Lead.create(payload);
  }

  let deal = null;

  // AUTO CREATE DEAL
  if (createDeal) {
    const existingDeal=await Deal.findOne({
      leadId:lead._id
    })
    if(existingDeal){
      throw new Error(
        "Deal already exists for this lead"
      )
    }
    //else create Deal
    deal = await Deal.create({
      leadId: lead._id,
      dealName,
      amount,
      closeDate,
      status:"open",
    });
    // SAVE DEAL ID INSIDE LEAD
    lead.dealId=deal._id;
    await lead.save();
  }

  return {
    lead,
    deal,
  };
};

// GET ALL LEADS
const getLeadsService = async () => {
    return await Lead.find()
    .populate("dealId")
      .sort({
        createdAt: -1,
      });
  };

  const updateLeadService = async (id, payload) => {

    const lead = await Lead.findById(id);
  
    if (!lead) {
      throw new Error("Lead not found");
    }
  
    // REMARK REQUIRED FOR LOST OR DEAD
    if (
      (payload.leadStage === "Lost" ||
        payload.leadStage === "Dead") &&
      (!payload.remark || payload.remark.trim() === "")
    ) {
      throw new Error(
        "Remark is required when lead stage is Lost or Dead"
      );
    }
  
    // UPDATE LEAD FIELDS
    Object.keys(payload).forEach((key) => {
      lead[key] = payload[key];
    });
  
    // IF LEAD BECOMES WON
    if (payload.leadStage === "Won") {
  
      lead.status = "converted";
  
      // AUTO CONVERT TO CLIENT
      if (lead.autoConvertToClient) {
  
        const existingClient = await Client.findOne({
          leadId: lead._id,
        });
  
        if (!existingClient) {
  
          await Client.create({
            leadId: lead._id,
  
            clientName: lead.name,
  
            email: lead.email,
  
            companyName: lead.companyName,
  
            address: lead.address,
          });
        }
      }
    }
  
    // IF LEAD LOST
    if (payload.leadStage === "Lost") {
  
      lead.status = "lost";
    }
  
    // IF LEAD DEAD
    if (payload.leadStage === "Dead") {
  
      lead.status = "lost";
    }
    if(payload.leadStage==="New"){
      lead.remark="";
    }
    await lead.save();
  
    return lead;
  };

module.exports = {
  createLeadService,
  getLeadsService,
  updateLeadService,
 
};