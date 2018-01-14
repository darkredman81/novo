const model = require('../models/venda_bilhetes.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(bilhete) {
		response.set("Content-Type", "text/html");
		response.render('bilhetes-list', {
			data: bilhete
		})
	})
});

router.get('/', function(request, response) {
	model.lerPrecoBilhete(function(bilhetes) {
		response.set("Content-Type", "text/html");
		response.render('venda_bilhetes-item', {
			data: bilhetes
			
			
		});
	});	
});


router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('venda_bilhetes-item', {
		isNew: true,
		bilhete: {},
		errors: []
	})
});



router.post('/create', function(request, response) {
	//request.checkBody('nome', 'O nome deve ter entre 5 e 10  caracteres').isLength({min: 5, max: 10});
	//request.checkBody('email', 'O email inserido não é válido').isEmail({email});
	var errors = request.validationErrors();	
	if (errors) {
		response.render('venda_bilhetes-item', {
			isNew: true,
			bilhete: {},
			errors: errors
		});
	}else{
		var data = {
			'numero': request.body.numero,
			'dia_sessao': request.body.dia_sessao,
			'tipo_bilhete': request.body.tipo_bilhete,
			'preco': request.body.preco,
			'quantidade_bilhetes': request.body.quantidade_bilhetes,
			'nome_participante': request.body.nome_participante,
			'data_compra': request.body.data_compra,
			'valortotal': request.body.valortotal,
		};
		model.create(data, function(){
			response.redirect('/bilhetes');
		});
	}
});

router.get('/:numero', function(request, response) {
	model.read(request.params.numero, function(bilhete) {
		if (bilhete != undefined) {
			console.log(bilhete);
			response.set("Content-Type", "text/html");
			response.render('venda_bilhetes-item', {
				isNew: false,
				bilhete: bilhete,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:numero', function(request, response) {
	var data = {
			'numero': request.body.numero,
			'dia_sessao': request.body.dia_sessao,
			'tipo_bilhete': request.body.tipo_bilhete,
			'preco': request.body.preco,
			'quantidade_bilhetes': request.body.quantidade_bilhetes,
			'nome_participante': request.body.nome_participante,
			'data_compra': request.body.data_compra,
			'valortotal': request.body.valortotal,	
	};
	model.update(request.params.numero, data, function(){
		response.redirect('/bilhetes/' + request.params.numero);
	});
});

router.get('/:numero/delete', function(request, response){
	model.remove(request.params.numero, function() {
		response.redirect('/bilhetes');
	})	
});

module.exports = router;