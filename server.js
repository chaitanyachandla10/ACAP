require('dotenv').config();
const http = require('http');
const app = require('./backend/app');
const { closeDatabase } = require('./backend/db');

const port = Number(process.env.PORT || 3000);
const server = http.createServer(app);
server.listen(port, () => console.info(`[api] ACAP listening on http://localhost:${port}`));
server.on('error', error => {
  if (error.code === 'EADDRINUSE') console.error(`[api] Port ${port} is already in use.`);
  else console.error('[api] Server error:', error.message);
  process.exit(1);
});

async function shutdown(signal) {
  console.info(`[api] ${signal} received; shutting down.`);
  server.close(async () => { await closeDatabase().catch(() => undefined); process.exit(0); });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
