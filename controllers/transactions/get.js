import { db } from "../../database/database.js";

export async function getTransactions(req, res) {
  const page = parseInt(req.query.page) || 1;

  if (page < 1 || isNaN(page)) {
    return res.status(400).send({ message: "Parâmetro 'page' inválido." });
  }

  const PAGE_SIZE = 10;
  const skip = (page - 1) * PAGE_SIZE;

  try {
    const transactions = await db.collection("transactions")
      .find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();

    return res.status(200).send(transactions);
  } catch (err) {
    console.error("Erro ao buscar transações:", err);
    return res.status(500).send({ message: "Erro interno do servidor." });
  }
}
