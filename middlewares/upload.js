const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "tmp"),
    filename: (req, file, cb) => {
      cb(null, Date.now() + "." + file.originalname.split(".").slice(1));
    },
  }),
});
