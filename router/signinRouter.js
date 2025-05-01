import {Router} from 'express';
import { SignIn } from '../controllers/signin';

const router = Router();
router.post('/sign-in', SignIn);
export default router;