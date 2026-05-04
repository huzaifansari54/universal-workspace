import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import webhookRouter from './routes/webhooks';
import moduleRouter from './routes/moduleRoutes';
import actionRouter from './routes/actionRoutes';
import resourceRouter from './routes/resourceRoutes';

/**
 * Main Entry Point for the Universal Action Workspace Core Engine.
 * This server handles API requests, file uploads, and action orchestration.
 */

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

// --- MIDDLEWARE ---
app.use(cors()); // Enable Cross-Origin Resource Sharing (allows frontend to talk to backend)

// IMPORTANT: The Stripe webhook route must come BEFORE express.json()
// because Stripe needs the raw request body to verify the signature.
app.use('/api/stripe', webhookRouter);

// Standard JSON body parser for all other routes
app.use(express.json());

// --- ROUTES ---
app.use('/api/modules', moduleRouter);   // Handles module registration
app.use('/api/actions', actionRouter);   // Handles action triggering and tracking
app.use('/api/resources', resourceRouter); // Handles file uploads and management

// Basic Health Check to verify the server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Universal Action Workspace Core' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`[Core Engine] Server running on http://localhost:${PORT}`);
});
