module.exports = {
	list(callback) {
		var sql = 'SELECT * from sessoes';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(nome, callback) {
		var sql = "SELECT * from sessoes where nome=?";	
		global.connection.query(sql, [nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO sessoes (nome, dia, duracao, sala ) VALUES (?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.dia, data.duracao, data.sala], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(nome, data, callback) {
		var sql = "UPDATE sessoes SET nome=?, dia=?, duracao=?, sala=? WHERE nome=?"; 
		global.connection.query(
			sql, [data.nome, data.dia, data.duracao, data.sala, data.nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(nome, callback) {
		var sql = "DELETE from sessoes WHERE nome=?"; 
		global.connection.query(sql, [nome], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
