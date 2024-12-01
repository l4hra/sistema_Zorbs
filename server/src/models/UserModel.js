import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';
import conexao from "../../conexao.js";
import jwt from "jsonwebtoken";

// Configuração da chave secreta para o JWT
const SECRET_KEY = "1234"; // Use uma chave mais segura.

// Obtendo o diretório do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  const sql = `INSERT INTO users (name, password, email, telefone, type_of_acess, status) VALUES (?,?,?,?,?,?)`;
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
    name = ?, password = ?, email = ?, telefone = ?, 
    type_of_acess = ?, status = ? WHERE id = ?`;
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
      return res.status(401).json({ message: "E-mail ou senha incorreto." });
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifique se o e-mail existe no banco de dados
    const [rows] = await conexao.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "E-mail não cadastrado. Entre em contato com o suporte." });
    }

    const user = rows[0];

    // Configure o Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou outro serviço de e-mail
      auth: {
        user: 'podolskii311@gmail.com', // Seu e-mail
        pass: 'blzq qpmb fmed jlpl', // Senha de aplicativo
      },
    });

    // Defina o caminho da imagem do logo (carregue a imagem no servidor)
    const logoPath = join(__dirname, "../../../client/src/assets/ZORBS.png"); // Ajuste conforme o local da imagem no seu servidor

    // Enviar o e-mail com a senha
    const mailOptions = {
      from: 'seu-email@gmail.com',
      to: email,
      subject: 'Recuperação de Senha - Zorbs',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; color: #333;">
            <div style="margin-bottom: 20px;">
              <img src="cid:logo" alt="Zorbs Logo" width="200" />
            </div>
            <h2>Recuperação de Senha</h2>
            <p>Olá, ${user.name || 'usuário'}!</p>
            <p style="font-size: 16px;">
              Sua senha foi solicitada. Aqui está sua senha de acesso à sua conta:
            </p>
            <p style="font-size: 18px; font-weight: bold;">
              ${user.password}
            </p>
            <p style="font-size: 16px;">
              Caso não tenha solicitado a recuperação de senha, por favor, ignore este e-mail.
            </p>
            <footer style="margin-top: 20px; font-size: 14px; color: #888;">
              <p>Atenciosamente,<br />Equipe Zorbs</p>
            </footer>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'logo', // Este ID será usado para referenciar a imagem no e-mail
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'A senha foi enviada para o seu e-mail.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao recuperar a senha', error });
  }
};
