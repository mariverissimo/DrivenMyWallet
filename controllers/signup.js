import { db } from "../database/database";
import bcrypt from "bcrypt";
export async function SignUp(req, res) {
    const {name, email, password, confirmPassword} = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(422).send("Todos os campos são obrigatórios.");
      }

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValidation.test(email)) {
        return res.status(422).send("Formato de e-mail inválido.");
      }
    
    if (password.length < 6) {
        return res.status(422).send("A senha deve ter no mínimo 6 caracteres.");
      }
    if (password !== confirmPassword) {
        return res.status(422).send("As senhas não coincidem.");
      }
    
    try {
        const usersCollection = db.collection('users');

        const existingEmail = await usersCollection.findOne({ email });
        if (existingEmail) {
            return res.status(409).send({ error: 'Usuário já cadastrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usersCollection.insertOne({
        name,
        email,
        password: hashedPassword,
        });

        return res.status(201).send({
        message: "Usuário criado com sucesso",
        userId: result.insertedId,
        });
    } catch (err) {
      console.error('Error saving user:', err);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    
}