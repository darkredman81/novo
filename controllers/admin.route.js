const usersModel = require('../models/user.model');
const model = require('../models/stats.model');
const express = require('express');
const router = express.Router();


router.get('/dashboard', global.secure(), function(request, response) {
	model.tspeaker(function(stats) {
	response.set("Content-Type", "text/html");
	response.render('admin/index', {
		user: request.user, errors: [],
		data: stats
	      })
		  }),
		  model.pspeakers(function(stats) {
	response.set("Content-Type", "text/html");
	response.render('admin/index', {
		data: stats
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
	response.set("Content-Type", "text/html");
	response.render('admin/index', {
		user: request.user, errors: [],
	})
/*  model.concatValor(function(users) {
      response.set("Content-Type", "text/html");
      response.render('admin/index', {
          user: request.user, errors: [],
          stats: statistics
      })*/
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