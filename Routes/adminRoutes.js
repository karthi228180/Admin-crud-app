const express = require('express');
const router = express.Router();
const {signup, login, logout} = require('../Controller/adminController');

router.post("/adminsignup", signup);
router.post("/adminlogin", login);
router.post("/adminlogout", logout);
// router.get("/adminProfile", profile);


module.exports = router;
