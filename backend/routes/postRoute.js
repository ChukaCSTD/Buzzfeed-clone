const express = require("express");
const { createPost, getPosts, getSinglePost, deletePost } = require("../controllers/postController");
const upload = require("../middlewares/fileUpload");
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/create_post", upload.single("post_cover") , createPost);
router.delete("/:id", deletePost);

module.exports = router;