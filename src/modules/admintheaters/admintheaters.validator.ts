import { check } from 'express-validator';
import multer from 'multer'
// console.log(multer)
export const storeValidators = [
  check('phone')
    .notEmpty()
    .withMessage('phone 格式錯誤 ex:02-1234567'),
];

export const updateValidators = [
  check('phone')
    // .matches(/^0\d{1}\-\d{7}$/)
    // .matches(/^0[1-9]\d{7,10}$/)
    .notEmpty()
    .withMessage('phone 格式錯誤 ex:02-12345678'),
];

const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,  
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimetype = fileTypes.test(file.mimetype)
    if (!mimetype) {
      return cb(new Error('file not supported'))
    }
    cb(null, true)
  }
})

export const fileValidate = (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  })
}