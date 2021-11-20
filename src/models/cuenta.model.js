const conexion = require('../db/conexion');

class CuentaModel {
    create = async ({ nombre, contrasena, email }) => {
        const sql = `INSERT INTO cuenta
        (nombre, contrasena, email) VALUES (?,?,?)`;

        const result = await conexion.execute(sql, [nombre, contrasena, email]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    find = async ({ contrasena_login, email_login }) => {
        const sql = `SELECT nombre, email FROM cuenta 
        WHERE EMAIL = '${email_login}' AND CONTRASENA = '${contrasena_login}' `;
        console.log(sql);
        const result = await conexion.execute(sql);
        console.log(result[0]);
        return result[0];
    }
}

module.exports = new CuentaModel;