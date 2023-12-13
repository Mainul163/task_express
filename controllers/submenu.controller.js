const subMenuInfo = require("../models/submenu.model");
const Menu = require("../models/menu.model");
const createSubMenu = async (req, res) => {
  console.log("............", req.body.menuId);

  const menuId = await Menu.findOne({ _id: req.body.menuId });

  if (menuId.id == req.body.menuId) {
    try {
      const subMenu = new subMenuInfo({
        name: req.body.name,
        banglaLabel: req.body.banglaLabel,
        englishLabel: req.body.englishLabel,
        image: `submenu/images/${req.file.filename}`,
        menuId: req.body.menuId,
      });

      subMenu.save();
      // Use the full path to the image in the response
      res.status(201).json({
        subMenu,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

const getSubMenu = async (req, res) => {
  const subMenu = await subMenuInfo.find();

  try {
    res.status(200).json({
      message: "get all user",
      data: subMenu,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateSubMenu = async (req, res) => {
  const updateSubMenu = await subMenuInfo.findOne({ _id: req.params.id });
  console.log(req.body.name);
  try {
    updateSubMenu.name = req.body.name;
    updateSubMenu.banglaLabel = req.body.banglaLabel;
    updateSubMenu.englishLabel = req.body.englishLabel;
    updateSubMenu.image = `submenu/images/${req.file.filename}`;
    res.status(201).json(updateSubMenu);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteSubMenu = async (req, res) => {
  try {
    await subMenuInfo.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "sub menu menu is deleted",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createSubMenu, getSubMenu, updateSubMenu, deleteSubMenu };
