module.exports = {

    config(callback) {
        var sql = "SELECT t.tutilizador, t2.tcolaborador, t6.tvoluntario, t1.tspeaker, t3.spatrocinios, t4.sspeakers, t5.scolaboradores from\n" +
            "((select count(iduser) tutilizador from users where type like 'utilizador') as t,\n" +
            "(select count(iduser) tspeaker from users where type like 'speaker') as t1,\n" +
            "(select count(iduser) tcolaborador from users where type not like 'utilizador') as t2,\n" +
            "(select SUM(montante) spatrocinios from patrocinios) as  t3,\n" +
            "(select SUM(salario) sspeakers from speakers)  as t4,\n" +
            "(select SUM(salario) scolaboradores from users) as t5),\n" +
            "(select count(iduser) tvoluntario from users where type like 'Voluntario') as t6";
        global.connection.query(sql, function(error, rows, fields) {
            if (error) throw error;
            console.log(rows);
            callback(rows);
        });
    }


};