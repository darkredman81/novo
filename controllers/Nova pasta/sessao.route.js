const express = require('express');
const router = express.Router();
const model = require('../models/registar_sessao.model');

router.get('/', function(request, response){
	response.set("Content-Type", "text/html");
	response.render('admin/sessoes-list', {})
});




module.exports = router;