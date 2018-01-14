const model = require('../models/registar_speaker.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(speakers) {
		response.set("Content-Type", "text/html");
		response.render('speakers-list', {
			data: speakers
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('registar-speaker-item', {
		isNew: true,
		speaker: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	//request.checkBody('nome', 'O nome deve ter entre 5 e 10  caracteres').isLength({min: 5, max: 10});
	//request.checkBody('email', 'O email inserido não é válido').isEmail({email});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('registar-speaker-item', {
			isNew: true,
			speaker: {},
			errors: errors
		});
	}else{
		var data = {
			'nome': request.body.nome,
			'telefone': request.body.telefone,
			'nif': request.body.nif,
			'cachet': request.body.cachet,
			'email': request.body.email,
			'dia_sessao': request.body.dia_sessao,
		};
		model.create(data, function(){
			response.redirect('/speakers');
		});
	}
});

router.get('/:nome', function(request, response) {
	model.read(request.params.nome, function(speaker) {
		if (speaker != undefined) {
			console.log(speaker);
			response.set("Content-Type", "text/html");
			response.render('registar-speaker-item', {
				isNew: false,
				speaker: speaker,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:nome', function(request, response) {
	var data = {
		'nome': request.body.nome,
		'telefone': request.body.telefone,
		'nif': request.body.nif,
		'cachet': request.body.cachet,
		'email': request.body.email,
		'dia_sessao': request.body.dia_sessao,	
	};
	model.update(request.params.nome, data, function(){
		response.redirect('/speakers/' + request.params.nome);
	});
});

router.get('/:nome/delete', function(request, response){
	model.remove(request.params.nome, function() {
		response.redirect('/speakers');
	})	
});

module.exports = router;