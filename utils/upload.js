const multer = require('multer')
const path = require('path')
const maxSize = 1 * 1024 * 1024

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.png' &&
      ext !== '.JPG' &&
      ext !== '.JPEG' &&
      ext !== '.PNG'
    ) {
      return cb('File type tidak suport', false)
    }
    cb(null, true)
  },
  limits: { fileSize: maxSize }
})

module.exports = upload
