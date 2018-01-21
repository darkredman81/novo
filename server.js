const port = process.env.PORT || 3000;
const ip = process.env.IP;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const validator = require('express-validator');
const fs = require('fs');



//new
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const usersModel = require('./models/user.model');


//This function will allow us to retrict the access to the routes
global.secure = function(type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.users.type) {
					return next();
				}else{
					response.redirect('/');
				}
			}else{
				return next();
			}			
		}
		response.redirect('/');
	}
};
//end of new

app.use(validator());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

//new
app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(username, callback) {
	callback(null, username);
});

passport.deserializeUser(function(username, callback) {
	usersModel.read(username, function(data) {
		callback(null, data);
	})
});
//end of new

app.set('view engine', 'ejs');
app.set('views','views');

global.connection = mysql.createConnection({
	host     : 'webitcloud.net',
	user     : 'webitclo_A156',
	password : 'PW1718A156732',
	database : 'webitclo_A15610',
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});


app.listen(port, function(){
	console.log('Server started at: ' + port);
});

//Midleware that sets the isAuthenticated variable in all views
app.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});

app.use('/', require('./controllers/index.route'));
app.use('/stats', require('./controllers/index.route'));
app.use('/public', express.static('_public'));
app.use('/admin', express.static('_public'));
app.use('/colaboradores', express.static('_public'));
app.use('/patrocinios', express.static('_public'));
app.use('/sessoes', express.static('_public'));
app.use('/speakers', express.static('_public'));
app.use('/workshop', express.static('_public'));
app.use(express.static(__dirname + '/_public'));





//new front-end
app.use('/login', require('./controllers/login.route'));
app.use('/logout', require('./controllers/logout.route'));
app.use('/profile', require('./controllers/profile.route'));
app.use('/admin', require('./controllers/admin.route'));
app.use('/users', require('./controllers/user.route'));
app.use('/workshop', require('./controllers/workshop_edit.route'));
app.use('/users-item', require('./controllers/user.route'));
app.use('/patrocinios', require('./controllers/registar_patrocinio.route'));
app.use('/speakers', require('./controllers/registar_speaker.route'));
app.use('/sessoes', require('./controllers/registar_sessao.route'));
app.use('/configuracoes', require('./controllers/configuracoes.route'));
app.use('/404', require('./controllers/404.route'));

//Back-end
app.use('/card', require('./controllers/registar_card.route'));
app.use('/colaboradores', require('./controllers/registar_colaborador.route'));
//app.use('/store', require('./controllers/store.route'));
app.use('/bilheteira', require('./controllers/bilheteira.route'));
app.use('/bilhetes', require('./controllers/bilhetes.route'));