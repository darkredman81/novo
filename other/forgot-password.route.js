const express = require('express');
const router = express.Router();

router.get('/', function(request, response){
	response.set("Content-Type", "text/html");
	response.render('forgot-password', {})
});

module.exports = router;