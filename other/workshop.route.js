const model = require('../models/workshop.model');
const express = require('express');
const router = express.Router();

router.get('/', function(request, response) {
	model.list(function(workshop) {
		response.set("Content-Type", "text/html");
		response.render('workshop-list', {
			data: workshop
		})
	})	
});


router.post('/:nome', function(request, response) {
	var data = {
		'nome': request.body.nome,
		'valor': request.body.valor,
		};
	model.update(request.params.nome, data, function(){
		response.redirect('/workshop/' + request.params.nome);
	});
});



router.get('/:nome', global.secure('admin'), function(request, response) {
	model.read(request.params.nome, function(nome) {
		if (nome != undefined) {
			response.set("Content-Type", "text/html");
			response.render('workshop-item', {
				isNew: false,
				workshop: nome,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:nome', global.secure('admin'), function(request, response) {	

	var data = {
		'nome': request.body.nome,
		'valor': request.body.valor		
	};
		
		model.update(request.params.nome, data, function(){
			response.redirect('/workshop/' + request.params.nome);
		});
	
});


module.exports = router;