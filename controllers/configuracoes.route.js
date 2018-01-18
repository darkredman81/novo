const model = require('../models/configuracoes.model');
const express = require('express');
const router = express.Router();


router.get('/', function(request, response) {
    model.list(function(workshop) {
        response.set("Content-Type", "text/html");
        response.render('admin/configuracoes', {
            data: workshop
        })
    })
});


router.get('/:idWorkshop', function(request, response) {
    model.read(request.params.idWorkshop, function(workshop) {
        if (workshop != undefined) {
            response.set("Content-Type", "text/html");
            response.render('admin/workshop_edit', {
                isNew: false,
                workshop: workshop,
                errors: []
            })
        }else{
            response.status(404).end();
        }
    })
});

router.post('/:idWorkshop', function(request, response) {
    request.checkBody('nome', 'O nome deverá entre 10 e 25  caracteres').isLength({min:10, max: 25});
    var data = {
        'idWorkshop': request.body.idWorkshop,
        'nome': request.body.nome,
        'datainicio': request.body.datainicio,
        'datafim': request.body.datafim,
        'local': request.body.local,


    };
    model.update(request.params.idWorkshop, data, function(){
        response.redirect('/workshop');
    });
});




module.exports = router;