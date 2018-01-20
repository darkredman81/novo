module.exports = {
	list(callback) {
		var sql = 'SELECT name, email, morada, nif, telefone, nif, b.salario, idsessao FROM sessoes a JOIN speakers b ON a.keyspeaker = b.idSPKR JOIN users c ON b.idSPKR = c.idUser;';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(name, callback) {
		var sql = "SELECT name, email, morada, nif, telefone, nif, b.salario, idsessao FROM sessoes a JOIN speakers b ON a.keyspeaker = b.idSPKR JOIN users c ON b.idSPKR = c.idUser WHERE name = ?";
		global.connection.query(sql, [name], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO users (name, email, nif, telefone, salario, type ) VALUES (?,?,?,?,?, 'Speaker')";
		global.connection.query(
			sql, [data.name, data.email, data.nif, data.telefone, data.salario, data.type], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(name, data, callback) {
		console.log(data);
		var sql = "UPDATE users SET name=?, email=?, nif=?, telefone=?, salario=? WHERE name=?";
		global.connection.query(
			sql, [data.email, data.nif, data.telefone, data.salario, name], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(name, callback) {
		var sql = "DELETE from users WHERE name=?";
		global.connection.query(sql, [name], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
