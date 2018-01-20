const model = require('../models/stats.model');
const modelcompra = require('../models/compra.model');
const express = require('express');
const router = express.Router();



router.get('/', function(request, response) {
	model.nspeakers(function(totalspeakers) {
		model.pspeakers(function(speakers) {
            model.dadosspeakers(function(dadoss) {
                model.sponsor(function(sponsor) {
                    model.workshop(function(workshop) {
                        model.sessoes(function(sessoes) {

                            model.bilhetes(function(bilhetes) {
                                response.set("Content-Type", "text/html");
                                response.render('index', {
                                    speakers: speakers,
                                    totalspeakers: totalspeakers,
                                    dadoss: dadoss,
                                    sponsor: sponsor,
                                    workshop: workshop,
                                    sessoes: sessoes,
                                    bilhetes: bilhetes
                                });


                            })
		})
        })
        })
		})
        })

    })
});


router.post('/buy', function(request, response) {

    var errors = request.validationErrors();
    if (errors) {
        response.render('/', {
            errors: errors
        });
    }else{
        var data = {
            'bilhete': request.body.bilhete,
            'preco': request.body.preco,
            'user': request.body.user,
        };
        modelcompra.compra(data, function(){
            response.redirect('/');
        });
    }
    response.redirect('/');
    console.log("Request Received");
});


module.exports = router;