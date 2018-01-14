const model = require('../models/registar_colaborador.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(colaborador) {
		response.set("Content-Type", "text/html");
		response.render('admin/colaboradores-list', {
			data: colaborador
		})
	})	
});

/*
router.get('/', function(request, response) {
	model.list(function(nrbilhetes) {
		response.set("Content-Type", "text/html");
		response.render('admin/', {
			data: nrbilhetes
		})
	})	
});*/

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('admin/registar-colaborador', {
		isNew: true,
		colaborador: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	request.checkBody('name', 'O nome deve ter entre 1 e 50  caracteres').isLength({min: 1, max: 50});
	request.checkBody('telefone', 'O nome deverá ter 9  caracteres').isLength({max: 9});
	//request.checkBody('email', 'O email inserido não é válido').isEmail({email});
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