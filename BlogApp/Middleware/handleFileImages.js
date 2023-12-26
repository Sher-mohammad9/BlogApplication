const multer = require("multer");
const path = require("path")
console.log(path.resolve())

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.resolve("./public/Images"))
    },

    filename : function(req, file, cb){
        const filenames = `profile-${req.user._id}-${file.originalname}`; 
        cb(null, filenames)
    }
});
const fileUploadHandler = multer({storage : storage}).single("profileImage")
module.exports = {
    fileUploadHandler
}