const UserModel = require("../model/user");

exports.getAllUsers = async (req, res, next) => {
  const filter = {};
  const all = await UserModel.find(filter);
  return res.status(200).json(all);
};
