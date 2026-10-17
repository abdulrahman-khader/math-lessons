import http from 'node:http';
import type { AddressInfo } from 'node:net';

/**
 * خادم رسائل محلي بواجهة ntfy.sh نفسها (POST /<قناة> و GET /<قناة>/sse)،
 * لتختبر الفحوصُ التحكمَ من الجوال دون استهلاك حصة ntfy.sh اليومية.
 */
export async function startRelay({ quotaUsed = false } = {}) {
  const subs = new Map<string, Set<http.ServerResponse>>();
  const posts: string[] = [];
  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const url = new URL(req.url ?? '/', 'http://x');
    const parts = url.pathname.split('/').filter(Boolean);
    if (req.method === 'OPTIONS') return void res.end();
    if (req.method === 'GET' && parts[1] === 'sse') {
      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
      res.write(`event: open\ndata: ${JSON.stringify({ event: 'open', topic: parts[0] })}\n\n`);
      if (!subs.has(parts[0])) subs.set(parts[0], new Set());
      subs.get(parts[0])!.add(res);
      req.on('close', () => subs.get(parts[0])?.delete(res));
      return;
    }
    if (req.method === 'POST' && quotaUsed) return void res.writeHead(429).end('{"code":42908}');
    if (req.method === 'POST' && parts.length === 1) {
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        posts.push(parts[0]);
        const msg = JSON.stringify({ event: 'message', topic: parts[0], message: body });
        for (const s of subs.get(parts[0]) ?? []) s.write(`data: ${msg}\n\n`);
        res.end('{}');
      });
      return;
    }
    res.writeHead(404).end();
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
  const port = (server.address() as AddressInfo).port;
  return {
    url: `http://127.0.0.1:${port}/`,
    /** القنوات التي نُشر إليها، بالترتيب */
    posts,
    close: () => {
      for (const set of subs.values()) for (const s of set) s.end();
      return new Promise<void>((r) => server.close(() => r()));
    },
  };
}

/** خادم PeerJS محلي للفحوص، بدل الخادم العام 0.peerjs.com */
export async function startPeerServer() {
  const { PeerServer } = await import('peer');
  const net = await import('node:net');
  // منفذ فارغ: نحجزه لحظة ثم نعطيه للخادم
  const port = await new Promise<number>((res) => {
    const s = net.createServer().listen(0, '127.0.0.1', () => {
      const p = (s.address() as AddressInfo).port;
      s.close(() => res(p));
    });
  });
  const server = PeerServer({ port, path: '/', host: '127.0.0.1' } as Parameters<typeof PeerServer>[0]);
  await new Promise((r) => setTimeout(r, 300));
  return {
    /** قيمة localStorage['remote:peer'] */
    opts: JSON.stringify({ host: '127.0.0.1', port, path: '/', secure: false }),
    close: () => new Promise<void>((r) => (server as unknown as { close: (cb: () => void) => void }).close?.(() => r()) ?? r()),
  };
}
