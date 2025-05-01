import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function SignIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ message: "Todos os campos são obrigatórios." });
      }
    
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValidation.test(email)) {
            return res.status(422).send({ message: "Formato de e-mail inválido." });
        }
    
    try{
       const usersCollection = db.collection("users")
        const user = await usersCollection.findOne({email});
        if (!user){
            return res.status(404).send({ message: "Usuário não encontrado." });
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Senha incorreta." });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

        return res.status(200).send({ token });
    }catch (err){
        console.error("Erro ao fazer login:", err);
        return res.status(500).send({ message: "Erro interno do servidor." });
    }
}