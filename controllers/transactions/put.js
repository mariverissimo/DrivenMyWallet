import { ObjectId } from "mongodb"; 
import { db } from "../../database/database.js";

export async function editTransaction(req, res) {
  const { id } = req.params;
  const { value, description, type } = req.body; 

  try {
    if (typeof value !== "number" || typeof description !== "string" || !['deposit', 'withdraw'].includes(type)) {
      return res.status(400).send({ message: "Dados inválidos" });
    }

    const transactionId = new ObjectId(id); 

    const transactionCollection = db.collection("transactions");
    const transaction = await transactionCollection.findOne({ _id: transactionId });

    if (!transaction) {
      return res.status(404).send({ message: "Transação não encontrada" });
    }

    const result = await transactionCollection.updateOne(
      { _id: transactionId },
      { $set: { value, description, type } } 
    );

    if (result.modifiedCount === 0) {
      return res.status(400).send({ message: "Erro ao editar a transação" });
    }

    return res.status(200).send({ message: "Transação editada com sucesso!" });

  } catch (err) {
    console.error("Erro ao editar a transação:", err);
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
}
