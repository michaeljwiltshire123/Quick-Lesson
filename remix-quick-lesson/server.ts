import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './src/server/routes';
import { exportRouter } from './server/server';
import { imposterRouter } from './server/imposterHandler';
import { gridlockRouter } from './server/gridlockHandler';
import { dontSayItRouter } from './server/dontSayItHandler';
import { competitiveQuizRouter } from './server/competitiveQuizHandler';
import { attachLiveRooms } from './server/liveRoomServer';
import { liveAddressRouter } from './server/liveAddressRouter';

export async function startServer() {
  const app = express();
  app.use(express.json({ limit: '15mb' }));

  app.use(apiRouter);
  app.use(exportRouter);
  app.use(imposterRouter);
  app.use(gridlockRouter);
  app.use(dontSayItRouter);
  app.use(competitiveQuizRouter);
  app.use(liveAddressRouter);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  const server = createServer(app);
  attachLiveRooms(server);
  server.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));
}

startServer();
