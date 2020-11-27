const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, files, cb) {
        if (!files.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    },
    dest: './uploads/'
})

module.exports = upload

