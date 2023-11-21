import { Router } from 'express';
import { userRouter } from './endpoint/user';

const router = Router();

router.use('/', userRouter);

export { router };
