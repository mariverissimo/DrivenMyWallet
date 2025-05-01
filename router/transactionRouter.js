import { Router } from "express";
import { createTransaction } from "../controllers/transactions.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const transactionrouter = Router();

transactionrouter.post("/transactions", authenticateToken, createTransaction);

export default transactionrouter;
