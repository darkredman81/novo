const model = require('../models/registar_sessao.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(sessoes) {
		response.set("Content-Type", "text/html");
		response.render('admin/sessoes-list', {
			data: sessoes
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('admin/registar-sessao', {
		isNew: true,
		sessoes: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	var errors = request.validationErrors();	
	if (errors) {
		response.render('admin/registar-sessao', {
			isNew: true,
			sessoes: {},
			errors: errors
		});
	}else{
		var data = {
			'nome': request.body.nome,
			'inicio': request.body.inicio,
			'fim': request.body.fim,
		};
		model.create(data, function(){
			response.redirect('/sessoes');
		});
	}
});

router.get('/:idSessao', function(request, response) {
	model.read(request.params.idSessao, function(sessoes) {
		if (sessoes != undefined) {
			response.set("Content-Type", "text/html");
			response.render('admin/registar-sessao', {
				isNew: false,
				sessoes: sessoes,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:idSessao', function(request, response) {
	var data = {
		  'nome': request.body.nome,
		  'inicio': request.body.inicio,
		  'fim': request.body.fim,
	};
	model.update(request.params.idSessao, data, function(){
		response.redirect('/sessoes');
	});
});

router.get('/:idSessao/delete', function(request, response){
	model.remove(request.params.idSessao, function() {
		response.redirect('/sessoes');
	})	
});

module.exports = router;