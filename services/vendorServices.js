const Vendor = require("../models/Vendor");

// CREATE
const createVendorService =
  async (payload) => {
    const existingVendor =
      await Vendor.findOne({
        vendorName:
          payload.vendorName,
      });

    if (existingVendor) {
      throw new Error(
        "Vendor already exists"
      );
    }

    return await Vendor.create(
      payload
    );
  };

// GET ALL
const getVendorsService =
  async () => {
    return await Vendor.find().sort({
      createdAt: -1,
    });
  };

// GET BY ID
const getVendorByIdService =
  async (id) => {
    const vendor =
      await Vendor.findById(id);

    if (!vendor) {
      throw new Error(
        "Vendor not found"
      );
    }

    return vendor;
  };

module.exports = {
  createVendorService,
  getVendorsService,
  getVendorByIdService,
};