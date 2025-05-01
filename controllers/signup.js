import { db } from "../database/database.js";
import userSignUpSchema from "../schemas/userSignUpSchema.js";
import bcrypt from "bcrypt";

export async function SignUp(req, res) {
  console.log("Body recebido:", req.body); 

  const { error, value } = userSignUpSchema.validate(req.body);
  
  if (error) {
    console.log("Erro de validação:", error.details);
    return res.status(422).send({ error: error.details[0].message });
  }


  const { name, email, password } = value;
  console.log("Dados após validação:", name, email, password);

  try {
    const usersCollection = db.collection("users");
    const existingEmail = await usersCollection.findOne({ email });

    if (existingEmail) {
      return res.status(409).send({ error: "Usuário já cadastrado" });
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
    console.error("Erro ao salvar usuário:", err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
