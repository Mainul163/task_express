const express = require("express");
const {
  createSubMenu,
  getSubMenu,
  updateSubMenu,
  deleteSubMenu,
} = require("../controllers/submenu.controller");
const app = express();
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./submenu/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
app.use(
  "/submenu/images",
  express.static(path.join(__dirname, "../submenu/images"))
);

router.post("/", upload.single("image"), createSubMenu);
router.get("/", getSubMenu);
router.put("/:id", upload.single("image"), updateSubMenu);
router.delete("/:id", deleteSubMenu);
module.exports = router;
