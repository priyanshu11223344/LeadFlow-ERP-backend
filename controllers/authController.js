const {
    loginService,
  } = require(
    "../services/authServices"
  );
  
  const login =
    async (req, res) => {
      try {
        const {
          email,
          password,
        } = req.body;
  
        const data =
          await loginService(
            email,
            password
          );
  
        res.status(200).json({
          success: true,
          data,
        });
      } catch (error) {
        res.status(401).json({
          success: false,
          message:
            error.message,
        });
      }
    };
  
  module.exports = {
    login,
  };