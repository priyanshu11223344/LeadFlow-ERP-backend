const Deal = require("../models/Deal");
const Lead=require("../models/Lead")

const createDealService = async (payload) => {
    const {
      leadId,
      dealName,
      amount,
      closeDate,
    } = payload;
  
    // CHECK IF LEAD EXISTS
    const lead = await Lead.findById(leadId);
  
    if (!lead) {
      throw new Error("Lead not found");
    }
  
    // CHECK IF DEAL ALREADY EXISTS
    const existingDeal = await Deal.findOne({
      leadId,
    });
  
    if (existingDeal) {
      throw new Error(
        "Deal already exists for this lead"
      );
    }
  
    // CREATE DEAL
    const deal = await Deal.create({
      leadId,
      dealName,
      amount,
      closeDate,
      status: "open",
      agent:lead.leadOwner
    });
  
    // SAVE DEAL ID INSIDE LEAD
    lead.dealId = deal._id;
  
    await lead.save();
  
    return deal;
  };
// GET ALL DEALS
const getDealsService = async () => {
    return await Deal.find()
    .populate("leadId")
    .sort({
      createdAt: -1,
    });
};
// GET SINGLE DEAL
const getDealByIdService = async (id) => {
    const deal = await Deal.findById(id)
      .populate("leadId");
  
    if (!deal) {
      throw new Error("Deal not found");
    }
  
    return deal;
  };
const updateDealService=async(id,payload)=>{
    const deal=await Deal.findById(id);
    if(!deal){
        throw new Error("Deal not found");
    }
    const allowedFields=[
        "dealName",
        "amount",
        "closeDate",
        "status",
    ]
    allowedFields.forEach((field)=>{
     if(payload[field]!==undefined){
        deal[field]=payload[field];
     }
    });
    await deal.save();
    return deal;
};
const deleteDealService=async(id)=>{
    const deal=await Deal.findById(id);
    if(!deal){
        throw new Error ("deal not found");
    }
    await Lead.findByIdAndUpdate(
        deal.leadId,
        {
            $unset:{
                dealId:1,
            }
        }
    );
    await Deal.findByIdAndDelete(id);
    return{
        message:"Deal Deleted Successfully"
    }
}
const getDealsByLeadService =
  async (leadId) => {
    return await Deal.find({
      leadId,
    }).populate("leadId");
  };
  module.exports = {
    createDealService,
    getDealsService,
    getDealByIdService,
    updateDealService,
    deleteDealService,
    getDealsByLeadService,
  };