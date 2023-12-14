const { v4: uuidv4 } = require("uuid");
const iamgeInfo = require("../models/imageUpload.model");

const createImage = async (req, res) => {
  try {
    const demu = {
      name: req.body.name,
      id: uuidv4(),
      image: `images/images/${req.file.filename}`,
    };
    const newImage = new iamgeInfo({
      ...demu,
      createdBy: req.user.username,
    });
    await newImage.save();

    res.status(201).json({
      newImage,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllImage = async (req, res) => {
  const image = await iamgeInfo.find();

  try {
    res.status(200).json({
      message: "get all menu info",
      data: image,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateImage = async (req, res) => {
  try {
    const updateImage = await iamgeInfo.findOne({ _id: req.params.id });
    console.log(updateImage);
    updateImage.name = req.body.name;
    updateImage.image = `images/images/${req.file.filename}`;

    // await updateImage.save();
    res.status(201).json(updateImage);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteImage = async (req, res) => {
  try {
    await iamgeInfo.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "image is deleted",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { createImage, getAllImage, updateImage, deleteImage };
