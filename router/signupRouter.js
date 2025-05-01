import {Router} from 'express';
import { SignUp } from '../controllers/signup';

const router = Router();
router.post('/sign-up', SignUp);
export default router;