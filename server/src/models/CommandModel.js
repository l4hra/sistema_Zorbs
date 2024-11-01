import mysql from "mysql2/promise";
import db from "../../conexao.js";

// Função para cadastrar produtos
export async function createCommand(command) {
  const conexao = mysql.createPool(db);
  const sql = `INSERT INTO commands (name, date_opening, totalPrice, payment, status)
    VALUES (?,?,?,?,?)`;
  const params = [
    command.name,
    command.date_opening,
    command.totalPrice,
    command.payment,
    command.status,
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log("comanda cadastrado");
    return [201, "Comanda cadastrada"];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

// Função para vizualizar produtos
export async function getAllCommands(req, res) {
  console.log("CommandController getCommand");
  const conexao = mysql.createPool(db);
  try {
    const [rows] = await conexao.query("SELECT * FROM commands");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar comandas", error });
  }
}

// Função para editar produtos
export async function updateCommand(id, command) {
  const conexao = mysql.createPool(db);
  const sql = `UPDATE commands SET name = ?, date_opening = ?, totalPrice = ?, payment = ?, status = ?
                 WHERE id = ?`;
  const params = [
    command.name,
    command.date_opening,
    command.totalPrice,
    command.payment,
    command.status,
    id, // Adicionando o id ao final para o WHERE
  ];

  try {
    const [result] = await conexao.query(sql, params);
    if (result.affectedRows > 0) {
      console.log("Comanda atualizado");
      return [200, "Comanda atualizado com sucesso"];
    } else {
      return [404, "Comanda não encontrada"];
    }
  } catch (error) {
    console.log(error);
    return [500, "Erro ao atualizar a Comanda"];
  }
}
