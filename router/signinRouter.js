import {Router} from 'express';
import { SignIn } from '../controllers/signin';

const signinrouter = Router();
signinrouter.post('/sign-in', SignIn);
export default signinrouter;