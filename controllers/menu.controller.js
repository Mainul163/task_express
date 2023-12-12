require("dotenv").config();

const Menu = require("../models/menu.model");

// ************** create menu ********************

const createUser = async (req, res) => {
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

// ************** get menu ********************

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

// ************** update  menu ********************

const updateMenu = async (req, res) => {
  console.log(".........", req.file);
  try {
    const updateMenu = await Menu.findOne({ _id: req.params.id });
    console.log("ddddddd", updateMenu);

    updateMenu.name = req.body.name;
    updateMenu.banglaLabel = req.body.banglaLabel;
    updateMenu.englishLabel = req.body.englishLabel;
    updateMenu.image = `upload/images/${req.file.filename}`;
    console.log(".........", updateMenu);
    // await updateMenu.save();
    res.status(201).json(updateMenu);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ************** delete  menu ********************

const deleteMenu = async (req, res) => {
  try {
    await Menu.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "menu is deleted",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { createUser, getUser, updateMenu, deleteMenu };
