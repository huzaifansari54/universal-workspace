import express from 'express';
import { ExecutionEngine } from '../services/executionEngine';

const router = express.Router();

router.post('/trigger', async (req, res) => {
  try {
    const action = await ExecutionEngine.triggerAction(req.body);
    res.json(action);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
