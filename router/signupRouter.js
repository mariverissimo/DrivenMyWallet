import {Router} from 'express';
import { SignUp } from '../controllers/signup';

const signuprouter = Router();
signuprouter.post('/sign-up', SignUp);
export default signuprouter;