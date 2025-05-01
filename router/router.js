import { Router } from "express";
import signuprouter from "./signupRouter.js"
import signinrouter from "./signinRouter.js"
import transactionRouter from "./transactionRouter.js";

const routes = Router()
routes.use(signuprouter)
routes.use(signinrouter)
routes.use(transactionRouter)
export default routes;