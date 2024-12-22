const express = require("express");
const { createComment, getCommentByPost, createReply, deleteComment } = require("../controllers/commentController");
const router = express.Router();

router.post("/new", createComment);
router.post("/reply", createReply);
router.get("/", getCommentByPost);
router.delete("/:id", deleteComment);

module.exports = router;