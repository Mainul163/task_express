const subMenu = require("../models/submenu.model");

const createSubMenu = async (req, res) => {
  try {
    const subMenu = {
      name: req.body.name,
      banglaLabel: req.body.banglaLabel,
      englishLabel: req.body.englishLabel,
      image: `submenu/images/${req.file.filename}`,
      menuId: req.body.menuId,
    };

    await subMenu.save();

    // Use the full path to the image in the response
    res.status(201).json({
      subMenu,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
