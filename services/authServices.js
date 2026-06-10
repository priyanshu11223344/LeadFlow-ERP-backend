const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const loginService =
  async (
    email,
    password
  ) => {
    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      throw new Error(
        "Invalid credentials"
      );
    }

    if (!user.isActive) {
      throw new Error(
        "User account is inactive"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Invalid credentials"
      );
    }

    user.lastLogin =
      new Date();

    await user.save();

    const token =
      jwt.sign(
        {
          userId:
            user._id,

          role:
            user.role,
        },

        process.env
          .JWT_SECRET,

        {
          expiresIn:
            process.env.JWT_EXPIRES_IN,
        }
      );

    return {
      token,

      user: {
        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,
      },
    };
  };

module.exports = {
  loginService,
};