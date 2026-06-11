const bcrypt =
  require("bcryptjs");

const User =
  require("../models/User");

// CREATE USER
const createUserService =
  async (
    payload,
    createdBy
  ) => {
    const existingUser =
      await User.findOne({
        email:
          payload.email,
      });

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        payload.password,
        10
      );

    return await User.create({
      ...payload,
      password:
        hashedPassword,
      createdBy,
    });
  };

// GET USERS
const getUsersService =
  async () => {
    return await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });
  };
// UPDATE USER
const bcrypt =
  require("bcryptjs");

const User =
  require("../models/User");

// CREATE USER
const createUserService =
  async (
    payload,
    createdBy
  ) => {
    const existingUser =
      await User.findOne({
        email:
          payload.email,
      });

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        payload.password,
        10
      );

    return await User.create({
      ...payload,
      password:
        hashedPassword,
      createdBy,
    });
  };

// GET USERS
const getUsersService =
  async () => {
    return await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });
  };
// UPDATE USER
const updateUserService =
  async (id, payload) => {

    const user =
      await User.findById(id);

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    if (payload.name !== undefined) {
      user.name =
        payload.name;
    }

    if (payload.email !== undefined) {

      const existingUser =
        await User.findOne({
          email:
            payload.email,
          _id: {
            $ne: id,
          },
        });

      if (existingUser) {
        throw new Error(
          "Email already exists"
        );
      }

      user.email =
        payload.email;
    }

    if (payload.role !== undefined) {
      user.role =
        payload.role;
    }

    if (
      payload.isActive !==
      undefined
    ) {
      user.isActive =
        payload.isActive;
    }

    await user.save();

    return user;
  };

// DELETE USER
const deleteUserService =
  async (id) => {

    const user =
      await User.findById(id);

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    await User.findByIdAndDelete(
      id
    );

    return {
      message:
        "User deleted successfully",
    };
  };
  module.exports = {
    createUserService,
    getUsersService,
    updateUserService,
    deleteUserService,
  };

// DELETE USER
const deleteUserService =
  async (id) => {

    const user =
      await User.findById(id);

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    await User.findByIdAndDelete(
      id
    );

    return {
      message:
        "User deleted successfully",
    };
  };
  module.exports = {
    createUserService,
    getUsersService,
    updateUserService,
    deleteUserService,
  };