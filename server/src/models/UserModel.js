import conexao from "../../conexao.js";
import jwt from "jsonwebtoken";

// Configuração da chave secreta para o JWT
const SECRET_KEY = "1234"; // Use uma chave mais segura.

export const getUsers = async (req, res) => {
  try {
    const [rows] = await conexao.query(
      "SELECT * FROM users WHERE type_of_acess != ?",
      ["zorbs"]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

export async function addUser(users) {

  const sql = `INSERT INTO users (name, password, 
  email, telefone, type_of_acess, status)
  VALUES (?,?,?,?,?,?)`;
  const params = [
    users.name,
    users.password,
    users.email,
    users.telefone,
    users.type_of_acess,
    users.status,
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log("Usuário cadastrado");
    return [201, "Usuário cadastrado"];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

export async function deleteUser(id) {
  const sql = "DELETE FROM users WHERE id = ?";

  try {
    const [result] = await conexao.query(sql, [id]);
    if (result.affectedRows > 0) {
      console.log("Usuario deletado");
      return [200, "Usuario deletado com sucesso"];
    } else {
      return [404, "Usuario não encontrado"];
    }
  } catch (error) {
    console.log(error);
    return [500, "Erro ao deletar usuario"];
  }
}

export async function updateUsers(id, users) {

  const sql = `UPDATE users SET 
  name = ?,
  password = ?, 
  email = ?, 
  telefone = ?, 
  type_of_acess = ?, 
  status = ?
  WHERE id = ?`;
  const params = [
    users.name,
    users.password,
    users.email,
    users.telefone,
    users.type_of_acess,
    users.status,
    id,
  ];

  try {
    const [result] = await conexao.query(sql, params);
    if (result.affectedRows > 0) {
      console.log("Usuário atualizado");
      return [200, "Usuário atualizado com sucesso"];
    } else {
      return [404, "Usuário não encontrado"];
    }
  } catch (error) {
    console.log(error);
    return [500, "Erro ao atualizar usuário"];
  }
}

// Gerar Token JWT
const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    type_of_acess: user.type_of_acess,
    status: user.status,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

// Login com geração de Token
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await conexao.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const user = rows[0];

    if (user.status !== "Ativo") {
      return res
        .status(403)
        .json({
          message: "Usuário inativo. Entre em contato com o administrador.",
        });
    }

    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login", error });
  }
};
