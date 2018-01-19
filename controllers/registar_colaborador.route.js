const model = require('../models/registar_colaborador.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(colaborador) {
        model.types(function(types) {
		response.set("Content-Type", "text/html");
		response.render('admin/colaboradores-list', {
			data: colaborador,
            types: types
        })
		})
	})	
});


router.get('/create', function(request, response) {
    model.types(function(types) {
	response.set("Content-Type", "text/html");
	response.render('admin/registar-colaborador', {
		isNew: true,
		colaborador: {},
		types: types,
		errors: []
	})
    })
});

router.post('/create', function(request, response) {
	request.checkBody('name', 'O nome deve ter entre 1 e 50  caracteres').isAlpha();

	request.checkBody('email', 'O email inserido não é válido').isEmail();
	//request.checkBody('telefone', 'O numero de telefone introduzido não é válido').isMobilePhone({locale: "any"});
	request.checkBody('nif', 'O NIF introduzido não é valido').isNumeric().isLength({min: 9, max: 9});
	request.checkBody('photo', 'A foto deve ser introduzida via URL').isURL();
	var errors = request.validationErrors();	
	if (errors) {
		response.render('admin/registar-colaborador', {
			isNew: true,
			colaborador: {},
			errors: errors
		});
	}else{
		var data = {
			'name': request.body.name,
			'morada': request.body.morada,
			'email': request.body.email,
			'telefone': request.body.telefone,
			'type': request.body.type,
			'nif': request.body.nif,
            'photo': request.body.photo,
		};
		model.create(data, function(){
			response.redirect('/colaboradores');
		});
	}
});

router.get('/:idUser', function(request, response) {
	model.read(request.params.idUser, function(colaborador) {
		if (colaborador != undefined) {
			response.set("Content-Type", "text/html");
			response.render('admin/registar-colaborador', {
				isNew: false,
				colaborador: colaborador,
				errors: []
			})		
		}else{
			response.redirect('/404');
		}
	})	
});

router.post('/:idUser', function(request, response) {
	request.checkBody('telefone', 'O nome deverá ter 9  caracteres').isLength({max: 9});
	request.checkBody('nif', 'O nome deverá ter 9  caracteres').isLength({max: 9});
	var data = {
	  	'idUser': request.body.idUser,
		'name': request.body.name,
		'morada': request.body.morada,
		'email': request.body.email,
		'telefone': request.body.telefone,
		'type': request.body.type,
		'nif': request.body.nif,
        'photo': request.body.photo,

	};
	model.update(request.params.idUser, data, function(){
		response.redirect('/colaboradores');
	});
});

router.get('/:idUser/delete', function(request, response){
	model.remove(request.params.idUser, function() {
		response.redirect('/colaboradores');
	})	
});



module.exports = router;