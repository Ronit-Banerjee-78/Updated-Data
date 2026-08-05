import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { projectRoutes } from './server/controllers/projectController.js';
import { settingsRoutes } from './server/controllers/settingsController.js';
import { uploadRoutes } from './server/controllers/uploadController.js';
import { volunteerRoutes } from './server/controllers/volunteerController.js';
import { initDB } from './server/models/db.js';
import { logger } from './server/middlewares/loggerMiddleware.js';
import { apiLimiter } from './server/middlewares/rateLimiterMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  
  // Apply logger and rate limiting middleware
  app.use(logger);
  app.use('/api', apiLimiter);

  // API Routes
  app.use('/api/projects', projectRoutes);
  app.use('/api/settings', settingsRoutes);
  app.use('/api/files', uploadRoutes);
  app.use('/api/volunteers', volunteerRoutes);

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Initialize database tables
  await initDB();

  // Vite middleware for development vs Production Static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Serve index.html for all non-API SPA routes (including /admin, /about, etc.)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Jiyonkathi Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
