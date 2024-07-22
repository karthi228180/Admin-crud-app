const express =require("express");
const router = express.Router();
const {user_login} = require('../Controller/UserController')

router.post("/userlogin", user_login)

module.exports = router;