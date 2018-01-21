const model = require('../models/bilhetes.model');
const express = require('express');
const router = express.Router();



router.get('/', function(request, response) {
    model.listabilhetes(function(listabilhetes) {
        response.set("Content-Type", "text/html");
        response.render('admin/bilhetes-list', {
            listabilhetes: listabilhetes
        })
    })
});


module.exports = router;