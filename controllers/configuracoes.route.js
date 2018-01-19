const model = require('../models/configuracoes.model');
const colaborador = require('../models/registar_colaborador.model');
const express = require('express');
const router = express.Router();


router.get('/', global.secure(), function(request, response) {
    model.config(function(config) {
        response.set("Content-Type", "text/html");
        response.render('admin/configuracoes', {
            config: config
        })
    })
});




module.exports = router;