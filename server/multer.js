const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.upload = (folderName) => {
    return fileUpload = multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          const Filepath = path.join(__dirname, `/uploads/${folderName}`);
          fs.mkdirSync(Filepath, { recursive: true })
          cb(null, Filepath);
        },
  
        filename: function (req,file,cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const filename = file.originalname.split(".")[0];
            cb(null,filename + "-" + uniqueSuffix + ".mp4");
        },
      }),
    })
  }