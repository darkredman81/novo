var bcrypt =  require('bcrypt-nodejs')
module.exports = {
	list(callback) {
		var sql = 'SELECT * from users';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	

	read(username, callback) {
		var sql = "SELECT * from users where username=?";	
		global.connection.query(sql, [username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO users (username, name, photo,  nif, email, morada, telemovel, password, hashedpassword) VALUES (?,?,?,?,?,?,?,?,?)"; 
		var hash = bcrypt.hashSync(data.password);
		global.connection.query(
			sql, [data.username, data.name, data.photo, data.nif, data.email, data.morada, data.telemovel, data.password, hash], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(username, data, callback) {
		var sql = "UPDATE users SET name=?, photo=?, nif=?, email=?, morada=?, telemovel=?, password=?, hashedpassword=? WHERE username=?"; 
		var hash = bcrypt.hashSync(data.password);
		global.connection.query(
			sql, [data.name,data.photo, data.nif, data.email, data.morada, data.telemovel, data.password, hash, username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(username, callback) {
		var sql = "DELETE from users WHERE username=?"; 
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	//New
	areValidCredentials(username, password, callback) {
		var sql = "SELECT password, hashedpassword FROM users WHERE username=?";
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			if (rows.length == 1 && bcrypt.compareSync( password, rows[0].hashedpassword)) {
				callback(true);
			}else{
				callback(false);
			}
		});
	}
};
