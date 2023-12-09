const Menu = require("../models/menu.model");

const createUser = async (req, res) => {
  try {
    const newMenu = new Menu({
      name: req.body.name,
      banglaLabel: req.body.banglaLabel,
      englishLabel: req.body.englishLabel,
      createdBy: req.body.username,
    });
    console.log(newMenu);
    await newMenu.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createUser };
