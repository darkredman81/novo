module.exports = {
	list(callback) {
		var sql = 'SELECT * from speakers';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(nome, callback) {
		var sql = "SELECT * from speakers where nome=?";	
		global.connection.query(sql, [nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO speakers (nome, telefone, nif, cachet, email, dia_sessao ) VALUES (?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.telefone, data.nif, data.cachet, data.email, data.dia_sessao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(nome, data, callback) {
		console.log(data);
		var sql = "UPDATE speakers SET nome=?, telefone=?, nif=?, cachet=?, email=?, dia_sessao=? WHERE nome=?"; 
		global.connection.query(
			sql, [data.nome, data.telefone, data.nif, data.cachet, data.email, data.dia_sessao, data.nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(nome, callback) {
		var sql = "DELETE from speakers WHERE nome=?"; 
		global.connection.query(sql, [nome], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
