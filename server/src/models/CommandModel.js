import conexao from "../../conexao.js";

// Função para cadastrar produtos
export async function createCommand(command) {
  const sql = `INSERT INTO commands (name, date_opening, totalPrice, payment, incompleted)
    VALUES (?,?,?,?,?)`;
  const params = [
    command.name,
    command.date_opening,
    command.totalPrice,
    command.payment,
    command.incompleted,
  ];

  try {
    const [retorno] = await conexao.query(sql, params);

    return [201, "Comanda cadastrada com sucesso!"];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

// Função para visualizar produtos

export async function getAllCommands(req, res) {
  console.log("CommandController getCommand");

  try {
    const [rows] = await conexao.query(`
      SELECT 
      db_zorbs.commands.id,
      db_zorbs.commands.name,
      db_zorbs.commands.date_opening,
      db_zorbs.commands.totalPrice,
      db_zorbs.commands.payment,
      db_zorbs.commands.completed,
      db_zorbs.commands.incompleted,
      db_zorbs.commands.canceled,
      db_zorbs.item_command.id AS item_command_id,
      db_zorbs.item_command.id_command,
      db_zorbs.item_command.name AS item_name,
      db_zorbs.item_command.qtd_products,
      db_zorbs.item_command.und_medida,
      db_zorbs.item_command.value_item,
      db_zorbs.products.id AS product_id,
      db_zorbs.products.name AS product_name,
      db_zorbs.products.category AS product_category,
      db_zorbs.products.observacao AS product_observacao,
      db_zorbs.products.type AS product_type
      FROM db_zorbs.commands LEFT JOIN db_zorbs.item_command ON commands.id = item_command.id_command LEFT JOIN db_zorbs.products ON products.id = item_command.id_products
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar comandas", error });
  }
}

export async function updateCommand(id, command) {
  const sql = `UPDATE commands 
               SET 
                 completed = ?, 
                 canceled = ?, 
                 incompleted = ?
               WHERE id = ?`;

  // Determina o estado da comanda
  const completed = command.completed ? 1 : 0;
  const canceled = command.canceled ? 1 : 0;
  const incompleted = command.incompleted ? 1 : 0;

  // Garante que somente um status esteja ativo
  const params = [completed, canceled, incompleted, id];

  try {
    const [result] = await conexao.query(sql, params);
    if (result.affectedRows > 0) {
      return [200, "Comanda atualizada com sucesso"];
    } else {
      return [404, "Comanda não encontrada"];
    }
  } catch (error) {
    console.log(error);
    return [500, "Erro ao atualizar a comanda"];
  }
}
