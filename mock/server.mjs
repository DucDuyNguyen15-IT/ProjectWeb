// GradStudio mock API (PA#3). Chỉ dùng module có sẵn của Node: chạy `node mock/server.mjs`, không cần npm install.
// PORT (mặc định 3001), MOCK_MODE = normal | slow | error | empty. Trả lời đúng như docs/api/.
import http from 'node:http';
import { ApiError, state, notFound, validation } from './lib/core.mjs';
import { routes as auth } from './routes/auth.mjs';
import { routes as catalog } from './routes/catalog.mjs';
import { routes as conversations } from './routes/conversations.mjs';
import { routes as schedule } from './routes/schedule.mjs';
import { routes as files } from './routes/files.mjs';

const PORT = Number(process.env.PORT) || 3001;
const MODE = (process.env.MOCK_MODE || 'normal').toLowerCase();
if (!['normal', 'slow', 'error', 'empty'].includes(MODE)) {
  console.error(`MOCK_MODE "${MODE}" không hợp lệ: dùng normal, slow, error hoặc empty.`);
  process.exit(1);
}
const DELAY = MODE === 'slow' ? 2000 : 150;

// Mỗi file trong routes/ xuất một mảng [method, path, handler]. File 05–10 thêm vào đây.
const table = [...auth, ...catalog, ...conversations, ...schedule, ...files].map(([method, pattern, handler]) => {
  const names = [];
  const re = new RegExp(`^${pattern.replace(/:(\w+)/g, (_, n) => { names.push(n); return '([^/]+)'; })}$`);
  return { method, pattern, re, names, handler };
});

function match(method, pathname) {
  let pathExists = false;
  for (const r of table) {
    const m = r.re.exec(pathname);
    if (!m) continue;
    pathExists = true;
    if (r.method !== method) continue;
    const params = Object.fromEntries(r.names.map((n, i) => [n, decodeURIComponent(m[i + 1])]));
    return { route: r, params };
  }
  return { pathExists };
}

// Token dạng token-<user id>: không cần lưu gì, nên vẫn dùng được sau khi restart mock.
function userFromRequest(req) {
  const h = req.headers.authorization || '';
  const m = /^Bearer\s+token-(.+)$/.exec(h);
  if (!m) return null;
  const u = state.users.find((x) => x.id === m[1]);
  return u && u.password ? u : null;
}

// MOCK_MODE=empty: mọi list trong câu trả lời thành [], kể cả list lồng trong object.
function emptyLists(v) {
  if (Array.isArray(v)) return [];
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, emptyLists(x)]));
  return v;
}

const errorBody = (e) => ({ error: { code: e.code, message: e.message, ...(e.fields ? { fields: e.fields } : {}) } });

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

async function handle(req) {
  const url = new URL(req.url, 'http://localhost');
  const isLogin = req.method === 'POST' && url.pathname === '/api/auth/login';
  if (MODE === 'error' && !isLogin) {
    return { status: 500, body: { error: { code: 'SERVER_ERROR', message: 'Máy chủ đang gặp sự cố. Thử lại sau.' } } };
  }

  const { route, params, pathExists } = match(req.method, url.pathname);
  if (!route) throw pathExists ? notFound('Phương thức này không có cho đường dẫn này.') : notFound('Không có đường dẫn này.');

  const raw = await readBody(req);
  let body = {};
  const type = req.headers['content-type'] || '';
  if (raw.length && type.includes('application/json')) {
    try { body = JSON.parse(raw.toString('utf8')); } catch { throw validation({ body: 'Body không phải JSON hợp lệ.' }); }
    if (body === null || typeof body !== 'object' || Array.isArray(body)) throw validation({ body: 'Body phải là một object JSON.' });
  }

  return route.handler({
    req, params, body, raw,
    query: Object.fromEntries(url.searchParams),
    user: userFromRequest(req),
  });
}

const server = http.createServer(async (req, res) => {
  let result;
  try {
    result = await handle(req);
  } catch (e) {
    if (!(e instanceof ApiError)) console.error(e);
    const err = e instanceof ApiError ? e : new ApiError(500, 'SERVER_ERROR', 'Máy chủ đang gặp sự cố. Thử lại sau.');
    result = { status: err.status, body: errorBody(err) };
  }
  await new Promise((r) => setTimeout(r, DELAY));

  const { status, body, file } = result;
  if (file) {
    res.writeHead(status, { 'Content-Type': file.type, 'Content-Length': Buffer.byteLength(file.data) });
    res.end(file.data);
  } else {
    const out = MODE === 'empty' && status < 400 ? emptyLists(body) : body;
    const json = JSON.stringify(out);
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(json) });
    res.end(json);
  }
  console.log(`${req.method} ${req.url} ${status}`);
});

server.listen(PORT, () => console.log(`GradStudio mock: http://localhost:${PORT}/api (MOCK_MODE=${MODE})`));
