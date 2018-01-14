module.exports = {
	list(callback) {
		var sql = 'SELECT * from bilhetes';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	/*readDataSessao(valor,callback) {
		var sql = "SELECT valor from workshop where nome =?";	
		global.connection.query(sql, [valor], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},*/
	
	
		//New
	lerPrecoBilhete(callback) {
		
		var sql = "SELECT valor FROM workshop where nome = 'Preco'";
		
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	lerDiasSessoes(callback){
		
		var sql = "SELECT dia FROM sessoes";
		
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	
	
	
	

	read(numero, callback) {
		var sql = "SELECT * from bilhetes where numero=?" ;	
		global.connection.query(sql, [numero], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	

	create(data, callback) {
		var sql = "INSERT INTO bilhetes (numero, data_compra, nome_participante, tipo_bilhete, preco, dia_sessao, quantidade_bilhetes, valortotal) VALUES (?,?,?,?,?,?,?,?)"; 
		global.connection.query(
			sql, [data.numero, data.data_compra, data.nome_participante, data.tipo_bilhete, data.preco, data.dia_sessao, data.quantidade_bilhetes, data.valortotal], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(numero, data, callback) {
		console.log(data);
		var sql = "UPDATE bilhetes SET numero=?, data_compra=?, nome_participante=?, tipo_bilhete=?, preco=?, dia_sessao=?, quantidade_bilhetes=?, valortotal=? WHERE numero=?"; 
		global.connection.query(
			sql, [data.numero, data.data_compra, data.nome_participante, data.tipo_bilhete, data.preco, data.dia_sessao, data.quantidade_bilhetes, data.valortotal, data.numero], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(numero, callback) {
		var sql = "DELETE from bilhetes WHERE numero=?"; 
		global.connection.query(sql, [numero], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
	

	
	
};
