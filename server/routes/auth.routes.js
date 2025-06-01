import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/auth/sign-up', signUp);

authRouter.post('/auth/sign-in', signIn);

export default authRouter;