const cloudinary = require("../../utils/cloudinary")
/*
 models 
 */
 const { Photo } = require("../../models/photo")
exports.uploadImageController = async (req,res) => {
    const {user,file} = req
    const {secure_url,public_id} = await cloudinary.uploader.upload(file.path)
    /* const secure_url = "secure_url"
    const public_id = "public_id" */
    if(user){
        new Photo({
            name:req.file.filename,
            userId: user._id,
            photoUrl: secure_url,
            cloudinaryId: public_id
        }).save().then(
            user => {res.status(200).json({message: "Upload successful."})},
            err => {res.status(404).json({error: "Couldn't upload !"})}
        )
    }else{
        res.status(401).json({error: "Couldn't upload !"})
    }
}