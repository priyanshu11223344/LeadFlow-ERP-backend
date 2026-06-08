const {
    createInventoryService,
    getInventoryService,
    getInventoryByIdService,
    updateInventoryService,
    deleteInventoryService,
  } = require("../services/inventoryServices");
  
  // CREATE
  const createInventory =
    async (req, res) => {
      try {
        const item =
          await createInventoryService(
            req.body
          );
  
        res.status(201).json({
          success: true,
          message:
            "Inventory item created successfully",
          data: item,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // GET ALL
  const getInventory =
    async (req, res) => {
      try {
        const items =
          await getInventoryService();
  
        res.status(200).json({
          success: true,
          count: items.length,
          data: items,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // GET ONE
  const getInventoryById =
    async (req, res) => {
      try {
        const item =
          await getInventoryByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: item,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // UPDATE
  const updateInventory =
    async (req, res) => {
      try {
        const item =
          await updateInventoryService(
            req.params.id,
            req.body
          );
  
        res.status(200).json({
          success: true,
          message:
            "Inventory updated successfully",
          data: item,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  // DELETE
  const deleteInventory =
    async (req, res) => {
      try {
        const result =
          await deleteInventoryService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          message: result.message,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createInventory,
    getInventory,
    getInventoryById,
    updateInventory,
    deleteInventory,
  };