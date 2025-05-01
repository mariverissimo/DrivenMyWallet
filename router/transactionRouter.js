import { Router } from "express";
import { createTransaction } from "../controllers/transactions/post.js";
import { getTransactions } from "../controllers/transactions/get.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const transactionRouter = Router();

transactionRouter.post("/transactions", authenticateToken, createTransaction);
transactionRouter.get("/transactions", authenticateToken, getTransactions);

export { transactionRouter };
