require("dotenv").config();

const Menu = require("../models/menu.model");

const createUser = async (req, res) => {
  console.log(req.file);
  try {
    const demu = {
      name: req.body.name,
      banglaLabel: req.body.banglaLabel,
      englishLabel: req.body.englishLabel,
      image: `upload/images/${req.file.filename}`,
    };
    const newMenu = new Menu({
      ...demu,
      createdBy: req.user.username,
    });

    await newMenu.save();

    // Use the full path to the image in the response
    res.status(201).json({
      newMenu,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUser = async (req, res) => {
  const menu = await Menu.find();

  try {
    res.status(200).json({
      message: "get all menu info",
      data: menu,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { createUser, getUser };
