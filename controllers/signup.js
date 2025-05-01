import { db } from "../database/database.js";
import userSingUpSchema from "../schemas/userSignUpSchema.js";
import bcrypt from "bcrypt";
export async function SignUp(req, res) {
  const { error, value } = userSingUpSchema.validate(req.body);
  
  if (error) {
    return res.status(422).send({ error: error.details[0].message });
  }
    const {name, email, password} = value;

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