import { Router } from "express";
import { SignUpRouter } from "./signupRouter"
import {SignInRouter} from "./signinRouter"

const router = Router()
router.use(SignUpRouter)
router.use(SignInRouter)
export default router;