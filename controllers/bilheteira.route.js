const usersModel = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response){
	response.set("Content-Type", "text/html");
	response.render('bilheteira', {})
});




module.exports = router;