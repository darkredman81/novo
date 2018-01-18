const model = require('../models/bilhetes.model');
const express = require('express');
const router = express.Router();



    router.get('/', global.secure(), function(request, response) {
        model.dados(function(dados) {
        	model.sessoes(function(sessoes) {
        response.set("Content-Type", "text/html");
        response.render('bilheteira', {
            dados: dados,
            sessoes: sessoes

        })
    });
    });
    });


module.exports = router;