import express from 'express';
import { networkInterfaces } from 'node:os';

export const liveAddressRouter = express.Router();
liveAddressRouter.get('/api/live-address', (req, res) => {
  const hostname = req.hostname;
  if (!['localhost', '127.0.0.1', '::1'].includes(hostname)) {
    res.json({ origin: `${req.protocol}://${req.get('host')}` }); return;
  }
  const address = Object.values(networkInterfaces()).flatMap((items) => items || [])
    .find((item) => item.family === 'IPv4' && !item.internal)?.address;
  if (!address || !req.socket.localPort) { res.status(503).json({ error: 'No local network address is available.' }); return; }
  res.json({ origin: `http://${address}:${req.socket.localPort}` });
});
