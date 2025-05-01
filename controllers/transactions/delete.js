import { db } from "../../database/database.js";
import { ObjectId } from "mongodb";

export async function deleteTransaction(req, res) {
  const transactionId = req.params.id; 
  
  try {
    const transactionObjectId = new ObjectId(transactionId);

    const transaction = await db.collection("transactions").findOne({ _id: transactionObjectId });

    if (!transaction) {
      return res.status(404).send({ message: "Transação não encontrada." });
    }

    if (transaction.userId !== req.userId) {
      return res.status(401).send({ message: "Você não pode excluir essa transação." });
    }

    await db.collection("transactions").deleteOne({ _id: transactionObjectId });

    return res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir transação:", err);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}
