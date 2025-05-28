const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Sets the file name for the uploaded file.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} file - The file object containing file details.
 * @param {Function} cb - The callback function to be called with the file name.
 */

/*******  172fc078-8c47-461a-87ea-1fb1a440b715  *******/    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
