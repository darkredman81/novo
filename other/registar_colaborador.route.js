const model = require('../models/registar_colaborador.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(colaborador) {
		response.set("Content-Type", "text/html");
		response.render('colaboradores-list', {
			data: colaborador
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('registar-colaborador-item', {
		isNew: true,
		colaborador: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	request.checkBody('nome', 'O nome deve ter entre 1 e 50  caracteres').isLength({min: 1, max: 50});
	//request.checkBody('email', 'O email inserido não é válido').isEmail({email});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('registar-colaborador-item', {
			isNew: true,
			colaborador: {},
			errors: errors
		});
	}else{
		var data = {
			'nome': request.body.nome,
			'morada': request.body.morada,
			'email': request.body.email,
			'telefone': request.body.telefone,
			'funcao_desempenhar': request.body.funcao_desempenhar,
			'nif': request.body.nif,
			'dia_trabalho': request.body.dia_trabalho,
			'estatuto': request.body.estatuto,
		};
		model.create(data, function(){
			response.redirect('/colaboradores');
		});
	}
});

router.get('/:nome', function(request, response) {
	model.read(request.params.nome, function(colaborador) {
		if (colaborador != undefined) {
			response.set("Content-Type", "text/html");
			response.render('registar-colaborador-item', {
				isNew: false,
				colaborador: colaborador,
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
		'morada': request.body.morada,
		'email': request.body.email,
		'telefone': request.body.telefone,
		'funcao_desempenhar': request.body.funcao_desempenhar,
		'nif': request.body.nif,
		'dia_trabalho': request.body.dia_trabalho,
		'estatuto': request.body.estatuto,	
	};
	model.update(request.params.nome, data, function(){
		response.redirect('/colaboradores/' + request.params.nome);
	});
});

router.get('/:nome/delete', function(request, response){
	model.remove(request.params.nome, function() {
		response.redirect('/colaboradores');
	})	
});

module.exports = router;