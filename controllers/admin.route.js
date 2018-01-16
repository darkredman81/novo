const model = require('../models/stats.model');
const usersModel = require('../models/user.model');
const express = require('express');
const router = express.Router();


    router.get('/dashboard', function(request, response) {
        model.nspeakers(function(totalspeakers) {
            model.pspeakers(function(speakers) {
                model.dadosspeakers(function(dadoss) {
                    model.sponsor(function(sponsor) {
                        model.workshop(function(workshop) {
                            response.set("Content-Type", "text/html");
                            response.render('admin/index', {
                                speakers: speakers,
                                totalspeakers: totalspeakers,
                                dadoss: dadoss,
                                sponsor: sponsor,
                                workshop: workshop
                            })
                        })
                    })
                })
            })
        })
    });




router.get('/tables', global.secure(), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('admin/tables', {
		user: request.user, errors: []
	})		
});

router.get('/charts', global.secure(), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('admin/charts', {
		user: request.user, errors: []
	})		
});

router.get('/forms', global.secure(), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('admin/forms', {
		user: request.user, errors: []
	})		
});

router.get('/', global.secure(), function(request, response) {
    model.workshop(function(workshop) {
	response.set("Content-Type", "text/html");
	response.render('admin/index', {
		user: request.user, errors: [],
        workshop: workshop
    })
	})
});

router.post('/', global.secure(), function(request, response) {
  request.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});
  var data = {
      'name': request.body.name,
      'email': request.body.email,
      'password': request.body.password
  };
  var errors = request.validationErrors();
  if (errors) {
      data.username = request.user.username;
      response.render('profile', {
          user: data, errors: errors
      })
  }else{
      usersModel.update(request.user.username, data, function(){
          response.redirect('/profile');
      });
  }
});

router.get('/logout', global.secure(), function(request, response) {
  request.logout();
  request.session.destroy();
  response.redirect('/');
});




module.exports = router;