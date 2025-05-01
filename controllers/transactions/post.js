import { db } from "../../database/database.js";
import transactionSchema from "../../schemas/transactionSchema.js";

export async function createTransaction(req, res) {
  const { error, value } = transactionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(422).send({ errors: messages });
  }

  const { value: amount, description, type } = value;

  try {
    const transactionsCollection = db.collection("transactions");

    const transaction = {
      userId: req.userId,
      value: amount,
      description,
      type,
      createdAt: new Date()
    };

    await transactionsCollection.insertOne(transaction);

    return res.status(201).send({ message: "Transação registrada com sucesso!" });
  } catch (err) {
    console.error("Erro ao registrar transação:", err);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}
