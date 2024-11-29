import mysql from "mysql2/promise";
import db from "../../conexao.js";

import conexao from "../../conexao.js";

// Função para cadastrar produtos
export async function createItemCommand(item) {
  const sql = `INSERT INTO item_command (id_products, id_command, name, qtd_products, value_item, und_medida)
                 VALUES (?,?,?,?,?,?)`;
  const params = [
    item.id_products,
    item.id_command,
    item.name,
    item.qtd_products,
    item.value_item,
    item.und_medida, // Corrigido aqui
  ];

  try {
    const [retorno] = await conexao.query(sql, params);

    return [201, "Item da comanda cadastrado"];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}
// Função para vizualizar produtos

export async function getAllItemCommands(req, res) {
  try {
    const [rows] = await db.query(`
        SELECT 
          item_command.id AS item_id,
          item_command.id_command,
          item_command.qtd_products,
          item_command.value_item,
          item_command.und_medida,
          products.name AS product_name,
          products.type AS product_type,
          products.category AS product_category,
          products.preco_venda AS product_price,
          commands.id AS command_id,
          commands.name AS command_name,
          commands.date_opening,
          commands.totalPrice,
          commands.payment,
          commands.completed,
          commands.incompleted,
          commands.canceled
      FROM 
          item_command
      JOIN 
          products ON item_command.id_products = products.id
      JOIN 
          commands ON item_command.id_command = commands.id;
    `);

    res.json(rows); // Envia os dados para o frontend
  } catch (error) {
    console.error("Erro ao buscar itens de comanda:", error);
    res.status(500).json({ message: "Erro ao buscar itens de comanda" });
  }
}

// Função para editar produtos
export async function updateItemCommand(idCommand, item) {
  // Atualizar o campo "payment" na tabela "command"
  if (item.payment !== undefined) {
    const paymentUpdateResult = await updatePaymentInCommand(idCommand, item.payment);
    if (paymentUpdateResult[0] !== 200) {
      return paymentUpdateResult; 
    }
  }

  await deleteItemCommandByIdCommand(idCommand);
  for (const iterator of item.items) {
    await createItemCommand(iterator);
  }

  return [200, "Comanda e pagamento atualizados"];
}

export async function updatePaymentInCommand(idCommand, payment) {
  const sql = `UPDATE commands SET payment = ? WHERE id = ?`;
  const params = [payment, idCommand];

  try {
    const [result] = await conexao.query(sql, params);
    if (result.affectedRows > 0) {
      console.log("Pagamento da comanda atualizado");
      return [200, "Pagamento atualizado com sucesso"];
    } else {
      return [404, "Comanda não encontrada"];
    }
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

export async function deleteItemCommandByIdCommand(idCommand) {
  const sql = `DELETE FROM item_command WHERE id_command = ?`;
  const params = idCommand;

  try {
    const [result] = await conexao.query(sql, params);
    if (result.affectedRows > 0) {
      console.log("Item de comanda deletado");
      return [200, "Item de comanda deletado com sucesso"];
    } else {
      return [404, "Comanda não encontrada"];
    }
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}
