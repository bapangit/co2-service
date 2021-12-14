const { Photo } = require("../../models/photo")
const cloudinary = require("../../utils/cloudinary")

exports.deletePhoto = async(req,res) => {
    const {_id} = req.body
    const userId = req.user._id
    try{
        const photo = await Photo.findOne({_id})
        if(userId == photo.userId){
           const data = await Photo.deleteOne(photo)
           const r = await cloudinary.uploader.destroy(photo.cloudinaryId)
           res.status(200).json({message:"Successfully deleted"})
        }else{
            res.status(500).json({error:"No Permission !"})
        }
    }catch(err){
            res.status(500).json({error:"Internal Server Error !"})
    }
}