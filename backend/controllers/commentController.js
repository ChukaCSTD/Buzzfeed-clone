const postModel = require("../models/postModels");
const userModel = require("../models/userModels");
const commentModel = require("../models/commentModels");

// creating a comment api call
const createComment = async (req, res) => {
  try{
    const post_id = req.body.post;
    const user_id =  req.body.user;
    const find_post = await postModel.findById(post_id);
    const find_user = await userModel.findById(user_id);
    if (!find_post) return res.status(404).send({ success: false, msg: "Post Not Found" });
    if (!find_user) return res.status(404).send({ success: false, msg: "User Not Found" });
    const new_comment = new commentModel(req.body);
    const resp =  await new_comment.save();
    res.status(200).send({ success: true, msg: " Comment Created", data: resp });
  } catch(error) {
    res.status(500).send({ message: "An Error has occurred", error: error.message });
  }
};

// creating api too get all comments for on a post
const getCommentByPost = async (req, res) => {
  try {
    const post_id = req.query.post_id;
    const comments = await commentModel.find({
      post: post_id,
      parent_comment: null
    })
    .populate("user", "username")
    .populate({
      path: "replies",
      populate: {
        path: "user",
        select: "username"
      }
    });
    
    const find_post = await postModel.findById(post_id);
    if (!find_post) return res.status(404).send({ success: false, msg: "Post Not Found" });
    res.status(200).send({ success: true, msg: "Comments for the posts", data: comments });
  } catch (error) {
    res.status(500).send({ message: "An Error has occurred", error: error.message });
  }
};

// creating api to update comment
const updateComment = async (req, res) => {
  try{
    const comment_id = req.params.id;
    const comment = await commentModel.findByIdAndUpdate(comment_id);
    if (!comment) return res.status(404).send({ success: false, msg: "Comment Not Found" });
    res.status(200).send ({ success: true, msg: "Comment Updated", data: comment });
  } catch (error) {
    res.status(500).send({ message: "An Error has occurred", error: error.message });
  }
};

// creating api to delete comment
const deleteComment = async (req, res) => {
  try{
    const comment_id = req.params.id;
    const comment = await commentModel.findByIdAndDelete(comment_id);
    if (!comment) return res.status(404).send({ success: false, msg: "Comment Not Found" });
    res.status(200).send({ success: true, msg: "Comment Deleted" });
  } catch (error) {
    res.status(500).send({ message: "An Error has occurred", error: error.message });
  };
};

const createReply = async (req, res) => {
  try {
    const { post_id, user_id, content, parent_comment_id } = req.body;
    const find_post = await postModel.findById(post_id);
    const find_user = await userModel.findById(user_id);
    const parent_comment = await commentModel.findById(parent_comment_id);

    if (!find_post) return res.status(404).send({ success: false, msg: "Post Not Found" });
    if (!find_user) return res.status(404).send({ success: false, msg: "User Not Found" });
    if (!parent_comment) return res.status(404).send({ success: false, msg: "Parent Comment Not Found" });

    const new_reply = new commentModel({
      post: post_id,
      user: user_id,
      content,
      parent_comment: parent_comment_id
    });

    const saved_reply = await new_reply.save();
    await commentModel.findByIdAndUpdate(
      parent_comment_id,
      { $push: { replies: saved_reply._id } }
    );

    const populated_reply = await commentModel.findById(saved_reply._id).populate("user", "username");
    
    res.status(200).send({ success: true, msg: "Reply Created", data: populated_reply });
  } catch (error) {
    res.status(500).send({ message: "An Error has occurred", error: error.message });
  }
};

module.exports = { createComment, getCommentByPost, createReply, deleteComment, updateComment };
// module.exports = { createComment, getCommentByPost, updateComment, deleteComment };