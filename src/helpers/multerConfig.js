const { log } = require("console");
const multer = require("multer");
const path = require("path");

// Define storage location and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.body.formName || "books";
    log(req.body);
    // const destinationPath = "public/images";
    const destinationPath = path.join("public/images", folderName);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Define file filter to only allow image files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG or PNG are allowed."), false);
  }
};

// Export multer configuration object
module.exports = {
  storage: storage,
  fileFilter: fileFilter,
};
