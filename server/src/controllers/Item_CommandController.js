const {
  createItemCommand,
  getAllItemCommands,
  updateItemCommand,
} = require("../models/Item_CommandModel.js");

// Create a new command
export async function criarItemCommand(req, res) {
  const commandData = req.body;
  const [status, resposta] = await createItemCommand(commandData);
  res.status(status).json(resposta);
}

// Get all commands
export async function getItemCommands(req, res) {
  const [status, resposta] = await getAllItemCommands();
  res.status(status).json(resposta);
}

// Get a specific command by ID
export async function atualizaItemCommandsId(req, res) {
  const { id } = req.params;
  const [status, resposta] = await getItemCommandById(id);
  res.status(status).json(resposta);
}

// Update a command
export async function atualizaItemCommand(req, res) {
  const { id } = req.params;
  const commandData = req.body;
  const [status, resposta] = await updateItemCommand(id, commandData);
  res.status(status).json(resposta);
}

// Delete a command
// export async function deleteCommand(req, res) {
//   const { id } = req.params;
//   const [status, resposta] = await deleteCommand(id);
//   res.status(status).json(resposta);
// }
