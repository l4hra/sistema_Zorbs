import conexao from "../../conexao.js";

// Função para cadastrar produtos
export async function createCommand(command) {
  const sql = `INSERT INTO commands (date_opening, totalPrice, payment, incompleted)
    VALUES (?,?,?,?)`;
  const params = [
    command.date_opening,
    command.totalPrice,
    command.payment,
    command.incompleted,
  ];
  try {
    const [retorno] = await conexao.query(sql, params);
    return [
      201,
      {
        message: "Comanda cadastrada com sucesso!",
        id_command: retorno.insertId,
      },
    ];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

// Função para visualizar produtos
export async function getAllCommands(req, res) {
  try {
    const dateFilter = req.query.date;
    const query = `
      SELECT 
        commands.id,
        CONVERT_TZ(commands.date_opening, '+00:00', '-03:00') AS date_opening,
        commands.totalPrice,
        commands.payment,
        commands.completed,
        commands.incompleted,
        commands.canceled,
        item_command.id AS item_command_id,
        item_command.id_command,
        item_command.name AS item_name,
        item_command.qtd_products,
        item_command.und_medida,
        item_command.value_item,
        products.id AS product_id,
        products.name AS product_name,
        products.category AS product_category,
        products.observacao AS product_observacao
      FROM commands
      LEFT JOIN item_command ON commands.id = item_command.id_command
      LEFT JOIN products ON products.id = item_command.id_products
      ${dateFilter ? `WHERE DATE(commands.date_opening) = ?` : ""}
    `;

    const values = dateFilter ? [dateFilter] : [];
    const [rows] = await conexao.query(query, values);

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar comandas", error });
  }
}

export async function getFilterCommands(req, res) {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "As datas de início e término são obrigatórias." });
  }
  try {
    const [rows] = await conexao.query(
      `
      SELECT 
        id,
        CONVERT_TZ(commands.date_opening, '+00:00', '-03:00') AS date_opening,
        totalPrice,
        payment,
        completed,
        canceled
      FROM db_zorbs.commands
      WHERE DATE(date_opening) BETWEEN ? AND ?
    `,
      [startDate, endDate]
    );
    const [statusCount] = await conexao.query(
      `
      SELECT 
        SUM(completed = 1) AS completed,
        SUM(canceled = 1) AS canceled,
        SUM(CASE WHEN completed = 1 THEN totalPrice ELSE 0 END) AS completeProfit,
        SUM(CASE WHEN canceled = 1 THEN totalPrice ELSE 0 END) AS canceledProfit
      FROM db_zorbs.commands
      WHERE DATE(date_opening) BETWEEN ? AND ?
    `,
      [startDate, endDate]
    );

    res.status(200).json({
      rows,
      statusCount: statusCount[0],
    });
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

  const completed = command.completed ? 1 : 0;
  const canceled = command.canceled ? 1 : 0;
  const incompleted = command.incompleted ? 1 : 0;

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

// export async function editCommand(id, command) {
//   const sqlUpdateCommand = `
//     UPDATE commands
//     SET date_opening = ?, totalPrice = ?, payment = ?, incompleted = ?, completed = ?, canceled = ?
//     WHERE id = ?
//   `;
//   const commandParams = [
//     command.date_opening,
//     command.totalPrice,
//     command.payment,
//     command.incompleted,
//     command.completed,
//     command.canceled,
//     command.id,
//   ];

//   try {
//     // Atualiza dados da comanda
//     await conexao.query(sqlUpdateCommand, commandParams);

//     // Deletar itens antigos da comanda para evitar duplicação
//     const sqlDeleteItems = `DELETE FROM item_command WHERE id_command = ?`;
//     await conexao.query(sqlDeleteItems, [command.id]);

//     // Inserir produtos atualizados na comanda
//     for (const product of command.items) {
//       const productData = [
//         product.id,
//         command.id,
//         product.name,
//         product.qtd_products,
//         product.value_item,
//         product.und_medida,
//       ];

//       const sqlInsertItem = `
//         INSERT INTO item_command (id_products, id_command, name, qtd_products, value_item, und_medida)
//         VALUES (?, ?, ?, ?, ?, ?)
//       `;
//       await conexao.query(sqlInsertItem, productData);
//     }

//     return [200, { message: "Comanda atualizada com sucesso!" }];
//   } catch (error) {
//     console.log("Erro ao atualizar a comanda:", error);
//     return [500, { message: "Erro ao atualizar a comanda", error }];
//   }
// }
