import { Router } from "express";
import { createTransaction } from "../controllers/transactions/post.js";
import { getTransactions } from "../controllers/transactions/get.js";
import { editTransaction } from "../controllers/transactions/put.js";
import { deleteTransaction } from "../controllers/transactions/delete.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const transactionRouter = Router();

transactionRouter.post("/transactions", authenticateToken, createTransaction);
transactionRouter.get("/transactions", authenticateToken, getTransactions);
transactionRouter.put("/transactions/:id", authenticateToken, editTransaction);
transactionRouter.delete("/transactions/:id", authenticateToken, deleteTransaction);

export default { transactionRouter };
