const { registerUser, loginUser, getAllUsers, registerAdmin, loginAdmin } = require('../controllers/userContollers');
const router = require('express').Router();
//or 
// const express = require('express');
// const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/adminregister', registerAdmin)
router.post('/adminlogin', loginAdmin)
router.get('/', getAllUsers)

module.exports = router;