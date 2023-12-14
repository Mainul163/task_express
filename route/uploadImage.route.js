const express = require("express");
const {
  createImage,
  getAllImage,
  updateImage,
  deleteImage,
} = require("../controllers/uploadImage.controller");
const router = express.Router();
const passport = require("passport");
const app = express();
app.use(passport.initialize());
require("../confiq/passport");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./images/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createImage
);

router.get("/", getAllImage);
router.put("/:id", upload.single("image"), updateImage);
router.delete("/:id", deleteImage);
module.exports = router;
