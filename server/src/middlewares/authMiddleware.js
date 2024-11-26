import jwt from "jsonwebtoken";

const SECRET_KEY = "1234";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Dados do usuário disponíveis no req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
};


export const checkAccessLevel = (requiredAccess) => (req, res, next) => {
  const user = req.user; // Vem do `authenticateToken`

  if (user.type_of_acess !== requiredAccess) {
    return res.status(403).json({ message: "Acesso não autorizado." });
  }

  next();
};