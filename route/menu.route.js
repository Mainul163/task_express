// const express = require("express");
// const app = express();
// const { createUser } = require("../controllers/menu.controller");
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();
// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });
// const upload = multer({ storage: storage });
// app.use("/image", express.static("upload/images"));
// router.post("/", upload.single("image"), createUser);

// module.exports = router;

const express = require("express");
const passport = require("passport");
const app = express();
app.use(passport.initialize());
require("../confiq/passport");
const {
  createUser,
  getUser,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu.controller");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// Use "/upload/images" as the static route
app.use(
  "/upload/images",
  express.static(path.join(__dirname, "../upload/images"))
);

// The form data should include a field named "image"
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createUser
);

router.get("/", getUser);
router.put("/:id", upload.single("image"), updateMenu);
router.delete("/:id", deleteMenu);
module.exports = router;
