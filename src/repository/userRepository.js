import UserModel from "../models/userModel.js";

export const create = async ({
  username,
  email,
  password,
  phone,
  address,
  isVerify,
}) => {
  const user = new UserModel({
    username,
    email,
    password,
    phone,
    address,
    isVerify,
  });

  return await user.save();
};

export const findOne = async (data) => {
  return await UserModel.findOne(data);
};
