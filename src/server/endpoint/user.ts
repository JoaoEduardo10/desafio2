import { Router } from 'express';
import { SignUpMiddleware } from '../middlewares/login/signUp';
import { SignUpRouter } from '../usecase/signUp';
import { SignInMiddleware } from '../middlewares/login/signIn';
import { SignInRouter } from '../usecase/signIn';
import { GetUserMiddleware } from '../middlewares/get-user/get-user';
import { GetUserRouter } from '../usecase/get-user';

const userRouter = Router();

userRouter.post('/user', SignUpMiddleware.middleware, SignUpRouter.signUp);
userRouter.post('/login', SignInMiddleware.middleware, SignInRouter.signIn);

userRouter.get('/user/:id', GetUserMiddleware.middleware, GetUserRouter.get);

export { userRouter };
