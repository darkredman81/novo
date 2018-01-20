module.exports = {
	list(callback) {
		var sql = 'SELECT distinct ss.nome, u.name, inicio, fim, localizacao, sala from sessoes ss, speakers s, users u where ss.keyspeaker=u.iduser';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

    pspeakers(callback) {
        var sql = "SELECT * FROM webitclo_A15610.pspeakers";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows)
            callback(rows);
        });
    },

    dadosworkshop(callback) {
        var sql = "SELECT * from  dadosworkshop";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            callback(rows[0]);
        });
    },

	salas(callback) {
        var sql = "SELECT * FROM webitclo_A15610.salas";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            callback(rows[0]);
        });
    },

    read(nome, callback) {
		var sql = "SELECT * from sessoes where idSessao=?";
		global.connection.query(sql, [idSessao], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO sessoes (keyspeaker, dia, sala, descrissao ) VALUES (?,?,?,?)";
		global.connection.query(
			sql, [data.keyspeaker, data.dia, data.sala, data.descrissao ], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(nome, data, callback) {
		console.log(data);
		var sql = "UPDATE sessoes SET nome=?, inicio=?, fim=? WHERE idSessao=?";
		global.connection.query(
			sql, [data.nome, data.inicio, data.fim], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(nome, callback) {
		var sql = "DELETE from sessoes WHERE idSessao=?";
		global.connection.query(sql, [idSessao], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	} 
};