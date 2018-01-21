const model = require('../models/sessoes-tipo.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
	model.list(function(patrocinios) {
		response.set("Content-Type", "text/html");
		response.render('admin/sessoes-tipo', {
	data: patrocinios
		})
	})	
});



router.post('/', function(request, response) {

	var errors = request.validationErrors();	
	if (errors) {
		response.render('sessoes-tipo', {
			isNew: true,
			patrocinio: {},
			errors: errors
		});
	}else{
		var data = {
			'tipobilhete': request.body.tipobilhete,
			'sessao': request.body.sessao,

		};
		model.create(data, function(){
			response.redirect('sessoes-tipo');
		});
	}
});
router.delete('/', function(request, response) {

    var errors = request.validationErrors();
    if (errors) {
        response.render('sessoes-tipo', {
            isNew: true,
            patrocinio: {},
            errors: errors
        });
    }else{
        var data = {
            'tipobilhete': request.body.tipobilhete,
            'sessao': request.body.sessao,

        };
        model.delete(data, function(){
            response.redirect('sessoes-tipo');
        });
    }
});

module.exports = router;