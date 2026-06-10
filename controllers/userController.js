const {
    createUserService,
    getUsersService,
    updateUserService,
    deleteUserService,
  } = require(
    "../services/userServices"
  );
  const {
    createAuditLog,
  } = require(
    "../services/auditLogService"
  );
  const createUser =
    async (req, res) => {
      try {
        const user =
          await createUserService(
            req.body,
            req.user._id
          )
          await createAuditLog({
            user: req.user,
          
            module: "Users",
          
            action: "CREATE",
          
            description:
              `Created user ${user.name}`,
          });
  
        res.status(201).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  const getUsers =
    async (req, res) => {
      try {
        const users =
          await getUsersService();
  
        res.status(200).json({
          success: true,
          data: users,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message:
            error.message,
        });
      }
    };
    const updateUser =
    async (req, res) => {
      try {
  
        const user =
          await updateUserService(
            req.params.id,
            req.body
          );
  
        res.status(200).json({
          success: true,
          data: user,
        });
  
      } catch (error) {
  
        res.status(400).json({
          success: false,
          message:
            error.message,
        });
  
      }
    };
  
  const deleteUser =
    async (req, res) => {
      try {
  
        const result =
          await deleteUserService(
            req.params.id
          );
  
        res.status(200).json({
          success: true,
          data: result,
        });
  
      } catch (error) {
  
        res.status(400).json({
          success: false,
          message:
            error.message,
        });
  
      }
    };
    module.exports = {
        createUser,
        getUsers,
        updateUser,
        deleteUser,
      };