const model = require('../models/bilhetes.model');
const express = require('express');
const router = express.Router();



router.get('/', function(request, response) {
    model.listatipo(function(listatipo) {
        response.set("Content-Type", "text/html");
        response.render('admin/bilhetestipo-list', {
            listatipo: listatipo


        })
    })
});




module.exports = router;