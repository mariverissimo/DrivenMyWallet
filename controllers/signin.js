import { db } from "../database/database.js";
import userSignInSchema from "../schemas/userSignInSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function SignIn(req, res) {
    const { error, value } = userSignInSchema.validate(req.body);
  
    if (error) {
      return res.status(422).send({ error: error.details[0].message });
    }
    const { email, password } = value;
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