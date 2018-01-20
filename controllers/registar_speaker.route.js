const model = require('../models/registar_speaker.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(speakers) {
		response.set("Content-Type", "text/html");
		response.render('admin/speakers-list', {
			data: speakers
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('admin/registar-speaker', {
		isNew: true,
		speakers: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	//request.checkBody('nome', 'O nome deve ter entre 5 e 10  caracteres').isLength({min: 5, max: 10});
	//request.checkBody('email', 'O email inserido não é válido').isEmail({email});
	//request.checkBody('nif', 'O NIF inserido não é válido').isLength({max: 9});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('admin/registar-speaker', {
			isNew: true,
			speakers: {},
			errors: errors
		});
	}else{
		var data = {
			'name': request.body.name,
			'telefone': request.body.telefone,
			'nif': request.body.nif,
			'salario': request.body.salario,
			'email': request.body.email,
			'photo': request.body.photo,
		};
		model.create(data, function(){
			response.redirect('/speakers');
		});
	}
});

router.get('/:idUser', function(request, response) {
	model.read(request.params.idUser, function(speakers) {
		if (speakers != undefined) {
			response.set("Content-Type", "text/html");
			response.render('admin/registar-speaker', {
				isNew: false,
				speakers: speakers,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:idUser', function(request, response) {
	var data = {
		'idUser': request.body.idUser,
		'name': request.body.name,
		'email': request.body.email,
		'telefone': request.body.telefone,
		'nif': request.body.nif,
		'salario': request.body.salario,
		'photo': request.body.photo,
	};
	model.update(request.params.idUser, data, function(){
		response.redirect('/speakers');
	});
});

router.get('/:idSPKR/delete', function(request, response){
	model.remove(request.params.idUser, function() {
		response.redirect('/speakers');
	})	
});



module.exports = router;