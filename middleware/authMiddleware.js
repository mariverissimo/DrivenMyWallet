import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Token não enviado ou inválido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    
    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(401).send({ message: "Token inválido." });
  }
}
