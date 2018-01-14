module.exports = {
	list(callback) {
		var sql = 'SELECT * from patrocinios';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(nome, callback) {
		var sql = "SELECT * from patrocinios where nome=?";	
		global.connection.query(sql, [nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO patrocinios (nome, valor) VALUES (?,?)"; 
		global.connection.query(
			sql, [data.nome, data.valor], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(nome, data, callback) {
		console.log(data);
		var sql = "UPDATE patrocinios SET nome=?, valor=? WHERE nome=?"; 
		global.connection.query(
			sql, [data.nome, data.valor, data.nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(nome, callback) {
		var sql = "DELETE from patrocinios WHERE nome=?"; 
		global.connection.query(sql, [nome], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
