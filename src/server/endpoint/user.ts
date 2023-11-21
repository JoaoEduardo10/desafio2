import { Router } from 'express';
import { SignUpMiddleware } from '../middlewares/login/signUp';
import { SignUpRouter } from '../usecase/signUp';
import { SignInMiddleware } from '../middlewares/login/signIn';
import { SignInRouter } from '../usecase/signIn';

const userRouter = Router();

userRouter.post('/user', SignUpMiddleware.middleware, SignUpRouter.signUp);
userRouter.post('/login', SignInMiddleware.middleware, SignInRouter.signIn);

export { userRouter };
