const multer = require('multer');
const path = require('path');

// MIME TYPE For Images
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

// Setting the storage location for images

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        //extra security if we detect mimeType other than these.
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");
        if (isValid) {
            error = null;
        }
        cb(error, path.resolve(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split('').join('-');
        const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension); //unique file name will be created . 
    }
})

module.exports = multer({ storage: storage }).array("multi-files", 10);