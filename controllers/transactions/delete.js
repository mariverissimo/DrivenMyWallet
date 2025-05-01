import { db } from "../../database/database.js";

export async function deleteTransaction(req, res) {
  const transactionId = req.params.id; 

  try {
    const transaction = await db.collection("transactions").findOne({ _id: transactionId });

    if (!transaction) {
      return res.status(404).send({ message: "Transação não encontrada." });
    }

    if (transaction.userId !== req.userId) {
      return res.status(401).send({ message: "Você não pode excluir essa transação." });
    }

    await db.collection("transactions").deleteOne({ _id: transactionId });

    return res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir transação:", err);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}
