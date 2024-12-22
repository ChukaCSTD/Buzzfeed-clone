const userModel = require("../models/userModels");
const postModel = require("../models/postModels");

const createPost = async (req, res) => {
    try {
        const user_id = req.body.user;
        if(!user_id) return res.status(401).send({message: "User ID Required"});
        const user = await userModel.findById(user_id);
        // if(!user.is_author) return res.status(401).send({success: false, message: "User Not Found"})
        const new_post = new postModel({...req.body, post_cover: req.file.path});
        const resp = await new_post.save();
        res.status(200).send({success: true, message: "Post Created Successfully", data: resp});
    } catch (error) {
        res.send({ success: false, msg: "The following error has occurred:", error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const resp = await postModel.find()
            .populate({
                path: 'user',
                select: 'username email role'
            });
        res.status(200).send({success: true, message: "Posts Retrieved Successfully", data: resp });
    } catch (error) {
        res.send({ success: false, msg: "The following error has occurred:", error: error.message });
    }
}

const getSinglePost = async (req, res) => {
    try{
        const id = req.params.id;
        const resp = await postModel.findById(id);
        if(!resp) return res.status(404).send({ success: false, message: "Post Not Found"});
        res.status(200).send({ success: true, message: "Post Retrieved", data: resp });
      }catch(error){
        res.send({ success: false, error: error.message})
      }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const resp = await postModel.findByIdAndDelete(id);
        if (!resp) return res.status(404).send({ success: false, message: "Post Not Found" });
        res.status(200).send({ success: true, message: "Post Deleted Successfully" });
    } catch (error) {
        res.status(500).send({ success: false, msg: "The following error has occurred:", error: error.message });
    }
};

module.exports = { createPost, getPosts, getSinglePost, deletePost };