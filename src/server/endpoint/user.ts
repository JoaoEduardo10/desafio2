import { Router } from 'express';
import { SignUpMiddleware } from '../middlewares/login/signUp';
import { SignUpRouter } from '../usecase/signUp';

const userRouter = Router();

userRouter.post('/user', SignUpMiddleware.middleware, SignUpRouter.signUp);

export { userRouter };
