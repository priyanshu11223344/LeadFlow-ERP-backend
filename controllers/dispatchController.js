const {
    createDispatchService,
    getDispatchesService,
    getDispatchByIdService,
  } = require(
    "../services/dispatchServices"
  );
  
  const createDispatch =
    async (req, res) => {
      try {
        const dispatch =
          await createDispatchService(
            req.body
          );
  
        res.status(201).json({
          success: true,
          data: dispatch,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getDispatches =
    async (req, res) => {
      try {
        const dispatches =
          await getDispatchesService();
  
        res.status(200).json({
          success: true,
          data: dispatches,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  const getDispatchById =
    async (req, res) => {
      try {
        const dispatch =
          await getDispatchByIdService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: dispatch,
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createDispatch,
    getDispatches,
    getDispatchById,
  };