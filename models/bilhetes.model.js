module.exports = {
	list(callback) {
		var sql = 'SELECT count(preco) as nrBilhetes FROM webitclo_a156.bilhete INNER JOIN tipobilhete ON bilhete.tipobilhete = tipobilhete.idTipoBilhete';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

    dados(callback) {
        var sql = 'SELECT * from dadosworkshop';
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows);
            callback(rows);
        });
    },

    sessoes(callback) {
        var sql = 'SELECT * from sessoes';
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
		var sql = "INSERT INTO bilheteira (userid, idsessao, tipo, qnt, soma, datacompra ) VALUES (?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.userid, data.idsessao, data.tipo, data.qnt, data.soma, data.datacompra ], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	}
};
