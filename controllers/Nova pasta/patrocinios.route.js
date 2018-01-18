const express = require('express');
const router = express.Router();
const model = require('../models/registar_patrocinio.model');

router.get('/', function(request, response){
	response.set("Content-Type", "text/html");
	response.render('patrocinios', {})
});




module.exports = router;