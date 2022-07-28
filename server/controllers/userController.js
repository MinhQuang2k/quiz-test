import { User } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const create = async (req, res) => {
  const role_id = "62d6d761c9c41368b6bd166f";
  try {
    const user = await User.create({ ...req.body, role_id });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
