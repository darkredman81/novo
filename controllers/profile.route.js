const express = require('express');
const router = express.Router();
const usersModel = require('../models/user.model');

router.get('/', global.secure(), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('profile', {
		user: request.user, errors: []
	})		
});

router.post('/', global.secure(), function(request, response) {
	//request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
	request.checkBody('photo', 'Link deverá conter até 300 caracteres').isLength({max: 300});
	var data = {
			'username': request.body.username,
			'name': request.body.name,
			'photo': request.body.photo,
			'nif': request.body.nif,
			'email': request.body.email,
			'morada': request.body.morada,
			'type': request.body.type,
			'telemovel':request.body.telemovel,
			'password': request.body.password		
	};
	var errors = request.validationErrors();	
	if (errors) {
		data.username = request.user.username;
		response.render('profile', {
			user: data, errors: errors
		})	
	}else{
		usersModel.update(request.user.username, data, function(){
			response.redirect('/'); // apos o submite redireciona para  a pagina home
		});
	}
});



router.get('/index', function(request, response) {
	//If is already authenticated don't show again the login form
	if (request.isAuthenticated()) {
		response.redirect('/');
		return;
	}
	response.set("Content-Type", "text/html");
	response.render('index', { errors: [] });
});

module.exports = router;