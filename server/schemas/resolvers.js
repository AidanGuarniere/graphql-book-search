// requirements
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          $or: [{ _id: context.user._id }, { username: context.user.username }],
        }).select("-__v -password");

        return userData;
      }
      throw new AuthenticationError("Not Logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      if (!user) {
        return res.status(400).json({ message: "Something is wrong!" });
      }
      {
        return { token, user };
      }
    },
  },
};

module.exports = resolvers;
