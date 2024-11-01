import mysql from 'mysql2/promise'

const conexao = mysql.createPool ({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_zorbs",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
});

export default db;