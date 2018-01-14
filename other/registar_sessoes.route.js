const model = require('../models/sessoes.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(sessoes) {
		response.set("Content-Type", "text/html");
		response.render('sessoes-list', {
			data: sessoes
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('sessoes-item', {
		isNew: true,
		sessao: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	//request.checkBody('nome', 'O nome deve ter entre 5 e 10  caracteres').isLength({min: 5, max: 10});
	//request.checkBody('email', 'O email inserido não é válido').isEmail({email});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('sessoes-item', {
			isNew: true,
			sessao: {},
			errors: errors
		});
	}else{
		var data = {
			'nome': request.body.nome,
			'dia': request.body.dia,
			'duracao': request.body.duracao,
			'sala': request.body.sala,
			};
		model.create(data, function(){
			response.redirect('/sessoes');
		});
	}
});

router.get('/:nome', function(request, response) {
	model.read(request.params.nome, function(sessao) {
		if (sessao != undefined) {
			console.log(sessao);
			response.set("Content-Type", "text/html");
			response.render('sessoes-item', {
				isNew: false,
				sessao: sessao,
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
		'dia': request.body.dia,
		'duracao': request.body.duracao,
		'sala': request.body.sala,
	};
	model.update(request.params.nome, data, function(){
		response.redirect('/sessoes/' + request.params.nome);
	});
});

router.get('/:nome/delete', function(request, response){
	model.remove(request.params.nome, function() {
		response.redirect('/sessoes');
	})	
});

module.exports = router;