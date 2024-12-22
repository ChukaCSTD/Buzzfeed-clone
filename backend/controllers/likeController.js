const likeModel = require("../models/likeModels");

const likePost = async (req, res) => {
    try {
        const post_id = req.body.post;
        const user_id = req.body.user;
        const post = await likeModel.findOne({post: post_id, user: user_id});
        if(!post) {
            const like_post = new likeModel({post: post_id, user: user_id, type: true});
            const resp = await like_post.save();
            res.status(200).send({success: true, messgae: "Post Liked", data: resp});
        }else {
            if (post.type === true) {
                post.type = false;
            } else {
                post.type = true;
            }
            await post.save();
            res.status(200).send({success: true, messgae: "Like Updated"});
        }
    } catch (error) {
        res.status(500).send({message: "An Error has Occured", errMsg: error.message})
    }
};

const getLikesByPost = async (req, res) => {
    try {
      const post_id = req.params.id;
      const resp = await likeModel.find({ post: post_id });
      const likes =  resp.filter((like) => like.type === true)
      res.status(200).send({ success: true, allLikes: resp, likes: likes });
    } catch(error) {
      res.status(500).send({ message: "An Error has occurred", error: error.message });
    }
};

module.exports = {likePost, getLikesByPost};