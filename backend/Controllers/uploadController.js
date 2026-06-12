import multer from "multer";
import path from "path";

const storage=multer.diskStorage({
    destination:function(req,file,cb){cb(null,"uploads/");},
    filename:function(req,res,cb){cb(null,Date.now()+path.extname(file.originalname));}
});

const upload=multer({storage,fileFilter:(req,file,cb)=>{
    if(mimetype=="application/zip" || file.originalname.endsWith(".zip")){cb(null,true);}
    else{cb(new error("only zip files are allowed"))};
}})

export default upload;