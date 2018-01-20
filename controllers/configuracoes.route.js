const model = require('../models/configuracoes.model');
const colaborador = require('../models/registar_colaborador.model');
const express = require('express');
const router = express.Router();


router.get('/', global.secure(), function(request, response) {
    model.config(function(config) {
        model.list(function(colaborador) {
        response.set("Content-Type", "text/html");
        response.render('admin/configuracoes', {
            config: config,
            data: colaborador
        })
        })
    })
});

router.post('/:idUser', function(request, response) {
    request.checkBody('salario', 'O maximo salario 9999').isLength({max: 9999});
    var data = {
        'salario': request.body.salario,

    };
    model.update(request.params.idUser, data, function(){
        response.redirect('/configuracoes');
    });
});




module.exports = router;