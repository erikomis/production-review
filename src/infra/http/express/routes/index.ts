import { Router } from 'express';
export const routerIndex = Router();
import routerAuth from './auth.Routes';

routerIndex.use('/api/auth/', routerAuth);
