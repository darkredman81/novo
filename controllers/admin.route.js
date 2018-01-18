const model = require('../models/dashboard.model');
const usersModel = require('../models/user.model');
const express = require('express');
const router = express.Router();


router.get('/', global.secure(), function(request, response) {
    model.dashboard(function(dashboard) {
	response.set("Content-Type", "text/html");
	response.render('admin/index', {
		user: request.user, errors: [],
        dashboard: dashboard
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