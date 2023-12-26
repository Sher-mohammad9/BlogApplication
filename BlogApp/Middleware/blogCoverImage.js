const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.resolve("./public/coverImages"))
    },
    filename : function(req, file, cb){
        const fileName = `coverImage-${req.user._id}-${file.originalname}`
        cb(null, fileName)
    }
});

const handleBlogCoverImages = multer({storage : storage}).single("coverImage");

module.exports = {
    handleBlogCoverImages,
}