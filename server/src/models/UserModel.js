import conexao from "../../conexao.js";
import jwt from "jsonwebtoken";

// Configuração da chave secreta para o JWT
const SECRET_KEY = "1234"; // Use uma chave mais segura.

export const getUsers = async (req, res) => {
  try {
    const [rows] = await conexao.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

export const addUser = async (req, res) => {
  const { name, email, password, type_of_acess } = req.body;
  try {
    const [result] = await conexao.query(
      "INSERT INTO users (name, email, password, type_of_acess) VALUES (?, ?, ?, ?)",
      [name, email, password, type_of_acess]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar usuário", error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await conexao.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir usuário", error });
  }
};

export const updateUsers  = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, type_of_acess } = req.body;

  try {
    await conexao.query(
      "UPDATE users SET name = ?, email = ?, password = ?, type_of_acess = ? WHERE id = ?",
      [name, email, password, type_of_acess, id]
    );
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

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
      return res.status(403).json({ message: "Usuário inativo. Entre em contato com o administrador." });
    }

    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login", error });
  }
};

