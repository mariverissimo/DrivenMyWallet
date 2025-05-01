import {Router} from 'express';
import { SignIn } from '../controllers/signin.js';

const signinrouter = Router();
signinrouter.post('/sign-in', SignIn);
export default signinrouter;