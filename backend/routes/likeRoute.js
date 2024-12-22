const express = require("express");
const { likePost, getLikesByPost } = require("../controllers/likeController");

const router = express.Router();

router.post("/", likePost);
router.get("/:id", getLikesByPost);

module.exports = router;