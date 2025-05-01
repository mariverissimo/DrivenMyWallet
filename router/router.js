import { Router } from "express";
import signuprouter from "./signupRouter"
import signinrouter from "./signinRouter"
import transactionrouter from "./transactionRouter";

const router = Router()
router.use(signuprouter)
router.use(signinrouter)
router.use(transactionrouter)
export default router;