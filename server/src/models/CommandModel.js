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
    const [rows] = await conexao.query("SELECT * FROM db_zorbs.commands INNER JOIN db_zorbs.item_command ON commands.id = item_command.id_command LEFT JOIN db_zorbs.products ON products.id = item_command.id_products");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar comandas", error });
  }
}

// Função para editar 
// export async function updateCommand(id, command) {
//   const sql = `UPDATE commands SET name = ?, date_opening = ?, totalPrice = ?, payment = ?, completed = ?, canceled = ?
//                  WHERE id = ?`;
//   const params = [
//     command.name,
//     command.date_opening,
//     command.totalPrice,
//     command.payment,
//     command.completed,
//     command.canceled,
//     id, // Adicionando o id ao final para o WHERE
//   ];

//   try {
//     const [result] = await conexao.query(sql, params);
//     if (result.affectedRows > 0) {
//       console.log("Comanda atualizado");
//       return [200, "Comanda atualizado com sucesso"];
//     } else {
//       return [404, "Comanda não encontrada"];
//     }
//   } catch (error) {
//     console.log(error);
//     return [500, "Erro ao atualizar a Comanda"];
//   }
// }
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