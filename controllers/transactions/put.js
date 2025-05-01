import { db } from "../../database/database.js";
import transactionSchema from "../../schemas/transactionSchema.js";

export async function editTransaction(req, res) {
  const { error, value } = transactionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(422).send({ errors: messages });
  }

  const { value: amount, description, type } = value;
  const transactionId = req.params.id;

  try {
    const transaction = await db.collection("transactions").findOne({ _id: transactionId });

    if (!transaction) {
      return res.status(404).send({ message: "Transação não encontrada." });
    }

    if (transaction.userId !== req.userId) {
      return res.status(401).send({ message: "Você não pode editar essa transação." });
    }

    await db.collection("transactions").updateOne(
      { _id: transactionId },
      {
        $set: {
          value: amount,
          description,
          type,
          updatedAt: new Date(),
        },
      }
    );

    return res.status(204).send();
  } catch (err) {
    console.error("Erro ao editar transação:", err);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}
