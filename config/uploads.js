const multer = require('multer');
const path = require('path');

const uploads = path.join('uploads');

 const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploads);
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
 });

 const uplodimg = multer({storage:storage}).single('avtar');

 module.exports = uplodimg;