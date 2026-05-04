import express from 'express';
import { registerModule } from '../controllers/moduleController';

const router = express.Router();

router.post('/register', registerModule);

export default router;
