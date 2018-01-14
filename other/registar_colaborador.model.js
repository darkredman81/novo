module.exports = {
	list(callback) {
		var sql = 'SELECT * from colaboradores';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(nome, callback) {
		var sql = "SELECT * from colaboradores where nome=?";	
		global.connection.query(sql, [nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO colaboradores (nome, email, morada, telefone, funcao_desempenhar, nif, dia_trabalho, estatuto) VALUES (?,?,?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome, data.email, data.morada, data.telefone, data.funcao_desempenhar, data.nif, data.dia_trabalho, data.estatuto,], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(nome, data, callback) {
		var sql = "UPDATE colaboradores SET nome=?, email=?, morada=?, telefone=?, funcao_desempenhar=?, nif=?, dia_trabalho=?, estatuto=? WHERE nome=?"; 
		global.connection.query(
			sql, [data.nome, data.email, data.morada, data.telefone, data.funcao_desempenhar, data.nif, data.dia_trabalho, data.estatuto, data.nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(nome, callback) {
		var sql = "DELETE from colaboradores WHERE nome=?"; 
		global.connection.query(sql, [nome], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
