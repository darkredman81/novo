const express = require('express');
const router = express.Router();
const usersModel = require('../models/user.model');

router.get('/', function(request, response) {
	//If is already authenticated don't show again the login form
	if (request.isAuthenticated()) {
		response.redirect('/');
		return;
	}
	response.set("Content-Type", "text/html");
	response.render('login', { errors: [] });
});

router.post('/', function(request, response) {
	request.checkBody('username', 'Username deve ter entre 5 e 20 carateres').isLength({min: 5, max: 20});
	request.checkBody('password', 'Password deve ter entre 5 e 15 carateres').isLength({min: 5, max: 15});
	var errors = request.validationErrors();

	if (errors) {
		response.render('login', { errors: errors });
		return;
	}

	usersModel.areValidCredentials(request.body.username, request.body.password, function(areValid) {
		if (areValid) {
			//Create the login session
			request.login(request.body.username, function(err) {
				response.redirect('/');
			});
		}else{
			response.render('login', { errors: [
				{ msg: 'Dados inseridos não estão corretos' }
			]});
		}
	});
});

module.exports = router;
