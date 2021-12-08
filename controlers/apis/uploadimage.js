const cloudinary = require("../../utils/cloudinary")
/*
 models 
 */
 const { Photo } = require("../../models/photo")
 const { User } = require("../../models/user")
exports.uploadImageController = async (req,res) => {
    const {user,file} = req
    const result = await cloudinary.uploader.upload(file.path)
    if(user){
        new Photo({
            name:req.file.filename,
            userId: user._id,
            photoUrl: result.secure_url,
            cloudinaryId: result.public_id
        }).save().then(
            user => {res.status(200).json({message: "Upload successful."})},
            err => {res.status(404).json({error: "Couldn't upload !"})}
        )
    }else{
        res.status(401).json({error: "Couldn't upload !"})
    }
}