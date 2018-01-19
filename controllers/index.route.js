const model = require('../models/stats.model');
const express = require('express');
const router = express.Router();



router.get('/', function(request, response) {
	model.nspeakers(function(totalspeakers) {
		model.pspeakers(function(speakers) {
            model.dadosspeakers(function(dadoss) {
                model.sponsor(function(sponsor) {
                    model.workshop(function(workshop) {
                        model.sessoes(function(sessoes) {
		    response.set("Content-Type", "text/html");
			response.render('index', {
			speakers: speakers,
			totalspeakers: totalspeakers,
            dadoss: dadoss,
            sponsor: sponsor,
            workshop: workshop,
            sessoes: sessoes
            })
		})
        })
        })
		})
        })
	})
});



module.exports = router;
