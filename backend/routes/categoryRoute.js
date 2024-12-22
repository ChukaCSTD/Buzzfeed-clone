const express = require("express");
const { createCategory, getCategory } = require("../controllers/categoryController");
const router = express.Router();

router.get("/", getCategory);
router.post("/create_new", createCategory);

module.exports = router;