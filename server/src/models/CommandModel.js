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
  console.log("batata", command);
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

// Itens ramon
//   const sqlItemComanda = 'INSERT INTO item_command (id_command,id_products,qtd_products,value_item,und_medida,name) VALUES (?,?,?,?,?,?,?)';
//   try {
//     const [retorno] = await conexao.query(sql, params);
//     // if(retorno.affectedRows > 0){
//       const paramsItem = [retorno.insertId]
//       const [retornoItem] = await conexao.query(sqlItemComanda,paramsItem)
//     // }
//     console.log("teste agora", retorno);
//     return [201, insertId];
//   } catch (error) {
//     console.log(error);
//     return [500, error];
//   }
// }

// Função para visualizar produtos

export async function getAllCommands(req, res) {
  // console.log("olhando", req.query["date"]);
  try {
    const [rows] = await conexao.query(
      `
      SELECT 
      db_zorbs.commands.id,
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
    `
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar comandas", error });
  }
}

export async function getFilterCommands(req, res) {
  const dateQuery = req.query["date"];
  try {
    // Consulta para obter as comandas detalhadas, agora com `DATETIME`
    const [rows] = await conexao.query(
      `
      SELECT 
        id,
        date_opening,
        totalPrice,
        payment,
        completed,
        canceled
      FROM db_zorbs.commands
      WHERE DATE(date_opening) = ?  -- Use DATE() para extrair a data
    `,
      [dateQuery]
    );

    // Consulta para contar as comandas 'complete', 'canceled' e somar o lucro separado
    const [statusCount] = await conexao.query(
      `
      SELECT 
        SUM(completed = 1) AS complete,
        SUM(canceled = 1) AS canceled,
        SUM(CASE WHEN completed = 1 THEN totalPrice ELSE 0 END) AS completeProfit,
        SUM(CASE WHEN canceled = 1 THEN totalPrice ELSE 0 END) AS canceledProfit
      FROM db_zorbs.commands
      WHERE DATE(date_opening) = ?  
    `,
      [dateQuery]
    );

    res.status(200).json({
      rows, // Dados das comandas
      statusCount: statusCount[0], // Contagem, lucro das comandas 'completed' e 'canceled'
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
