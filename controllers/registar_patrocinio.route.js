const model = require('../models/registar_patrocinio.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(patrocinios) {
		response.set("Content-Type", "text/html");
		response.render('admin/patrocinios-list', {
	data: patrocinios
		})
	})	
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('admin/registar-patrocinio', {
		isNew: true,
		patrocinio: {},
		errors: []
	})
});

router.post('/create', function(request, response) {
	request.checkBody('Patrocinador', 'O Patrocinador deve ter entre 5 e 10  caracteres').isAlphanumeric();
	request.checkBody('montante', 'O montante não inserido não é válido').isNumeric().isCurrency({allow_negatives: false});
	request.checkBody('urllogo', 'Introduza um URL válido').isURL();
	var errors = request.validationErrors();	
	if (errors) {
		response.render('admin/registar-patrocinio', {
			isNew: true,
			patrocinio: {},
			errors: errors
		});
	}else{
		var data = {
			'Patrocinador': request.body.Patrocinador,
			'montante': request.body.montante,
            'urllogo': request.body.urllogo,
		};
		model.create(data, function(){
			response.redirect('/patrocinios');
		});
	}
});

module.exports = router;