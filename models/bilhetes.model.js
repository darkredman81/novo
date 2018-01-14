module.exports = {
	list(callback) {
		var sql = 'SELECT count(preco) as nrBilhetes FROM webitclo_a156.bilhete INNER JOIN tipobilhete ON bilhete.tipobilhete = tipobilhete.idTipoBilhete';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(nome, callback) {
		var sql = "SELECT * from tipoBilhete where tipoBilhetes=?";
		global.connection.query(sql, [nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO bilhete (idparticipante, tipobilhete ) VALUES (?,?)";
		global.connection.query(
			sql, [data.idparticipante, data.tipobilhete], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	/*update(nome, data, callback) {
		console.log(data);
		var sql = "UPDATE speakers SET nome=?, telefone=?, nif=?, cachet=?, email=?, dia_sessao=? WHERE nome=?"; 
		global.connection.query(
			sql, [data.nome, data.telefone, data.nif, data.cachet, data.email, data.dia_sessao, data.nome], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},*/
	
	remove(nome, callback) {
		var sql = "DELETE from bilhete WHERE nome=?";
		global.connection.query(sql, [nome], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
};
