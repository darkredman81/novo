const model = require('../models/stats.model');
const express = require('express');
const router = express.Router();



router.get('/', function(request, response) {
	model.nspeakers(function(totalspeakers) {
		model.pspeakers(function(speakers) {
		    response.set("Content-Type", "text/html");
			response.render('index', {
			speakers: speakers,
			totalspeakers: totalspeakers
		})
		})
		/*response.set("Content-Type", "text/html");
		response.render('index', {
			data: stats
		})*/
	})
});

/*router.get('/', function(request, response) {
	model.pspeakers(function(stats) {
		response.set("Content-Type", "text/html");
		response.render('index', {
			data: stats
		})
	})
});*/


module.exports = router;
