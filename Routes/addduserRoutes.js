const express = require('express');
const router = express.Router();
const  {user_Update,adduser,user_details, user_display,user_delete}  = require('../Controller/adduserConteoller');



router.post('/adduser', adduser);
router.get('/display', user_details);
router.get('/:id', user_display);
router.patch('/:id', user_Update);
router.delete('/:id', user_delete);


module.exports = router;