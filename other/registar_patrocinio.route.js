const model = require('../models/registar_patrocinio.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(patrocinios) {
		response.set("Content-Type", "text/html");
		response.render('patrocinios-list', {
			data: patrocinios
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('registar-patrocinio-item', {
		isNew: true,
		patrocinio: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	//request.checkBody('nome', 'O nome deve ter entre 5 e 10  caracteres').isLength({min: 5, max: 10});
	//request.checkBody('email', 'O email inserido não é válido').isEmail({email});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('registar-patrocinio-item', {
			isNew: true,
			patrocinio: {},
			errors: errors
		});
	}else{
		var data = {
			'nome': request.body.nome,
			'valor': request.body.valor,
		};
		model.create(data, function(){
			response.redirect('/patrocinios');
		});
	}
});

router.get('/:nome', function(request, response) {
	model.read(request.params.nome, function(patrocinio) {
		if (patrocinio != undefined) {
			console.log(patrocinio);
			response.set("Content-Type", "text/html");
			response.render('registar-patrocinio-item', {
				isNew: false,
				patrocinio: patrocinio,
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
		'valor': request.body.valor,
	};
	model.update(request.params.nome, data, function(){
		response.redirect('/patrocinios/' + request.params.nome);
	});
});

router.get('/:nome/delete', function(request, response){
	model.remove(request.params.nome, function() {
		response.redirect('/patrocinios');
	})	
});

module.exports = router;