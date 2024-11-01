import mysql from "mysql2/promise";
import db from "../../conexao.js";

// Função para cadastrar produtos
export async function createItemCommand(item) {
  const conexao = mysql.createPool(db);
  const sql = `INSERT INTO item_command (id_products, id_command, qtd_products, value_item, und_measure)
                 VALUES (?,?,?,?,?)`;
  const params = [
    item.id_products,
    item.id_command,
    item.qtd_products,
    item.value_item,
    item.und_measure,
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log("Item da comanda cadastrado");
    return [201, "Item da comanda cadastrado"];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

// Função para vizualizar produtos
export async function getAllItemCommands(req, res) {
  // console.log("CommandController getCommand");
  const conexao = mysql.createPool(db);
  try {
    const [rows] = await conexao.query("SELECT * FROM item_command");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar item de comandas", error });
  }
}

// Função para editar produtos
export async function updateItemCommand(id, item) {
  const conexao = mysql.createPool(db);
  const sql = `UPDATE item_command SET id_products = ?, id_command = ?, qtd_products = ?, value_item = ?, und_measure = ?
                 WHERE id = ?`;
  const params = [
    item.id_products,
    item.id_command,
    item.qtd_products,
    item.value_item,
    item.und_measure,
    id,
  ];

  try {
    const [result] = await conexao.query(sql, params);
    if (result.affectedRows > 0) {
      console.log("Item de comanda atualizado");
      return [200, "Item de comanda atualizado com sucesso"];
    } else {
      return [404, "Item de comanda não encontrada"];
    }
  } catch (error) {
    console.log(error);
    return [500, "Erro ao atualizar a Item de comanda"];
  }
}
