const multer = require('multer')
var path = require('path')

/*
 whitelist
 */
const mimeTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png'
]
const extTypes = [
    '.jpg',
    '.jpeg',
    '.png'
]

exports.uploadImageMiddleware = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if (extTypes.includes(path.extname(file.originalname)) && mimeTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            return cb(new Error('file is not allowed'))
        }
    },
    limits: {
        fields: 1,
        fieldNameSize: 5, // TODO: Check if this size is enough, this case 'image'(5)
        fieldSize: 524288, //TODO: Check if this size is enough
        // TODO: Change this line after compression
        fileSize: 524288, // 150 KB for a 1080x1080 JPG 90
    }
}).single("image")
