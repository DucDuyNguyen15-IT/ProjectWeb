// Phần dùng chung cho mọi handler: lỗi theo dạng chung của README, kiểm tra vai trò, dữ liệu trong bộ nhớ, đồng hồ.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');

export class ApiError extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

export const unauthenticated = (message = 'Bạn cần đăng nhập.') => new ApiError(401, 'UNAUTHENTICATED', message);
export const forbidden = (message = 'Bạn không có quyền xem mục này.') => new ApiError(403, 'FORBIDDEN', message);
export const notFound = (message = 'Không tìm thấy.') => new ApiError(404, 'NOT_FOUND', message);
export const conflict = (message) => new ApiError(409, 'CONFLICT', message);
export const validation = (fields) => new ApiError(400, 'VALIDATION', 'Dữ liệu chưa hợp lệ.', fields);

// Ném 400 nếu có ít nhất một field sai; gọi sau khi đã gom đủ lỗi của mọi field.
export function throwIfInvalid(fields) {
  if (Object.keys(fields).length) throw validation(fields);
}

// 401 khi không có user (token thiếu/sai), 403 khi sai vai trò.
export function requireRole(user, roles, message) {
  if (!user) throw unauthenticated();
  if (!roles.includes(user.role)) throw forbidden(message);
}

export const publicUser = (u) => ({ id: u.id, name: u.name, role: u.role });

// Dữ liệu đọc từ mock/data/*.json mỗi lần khởi động; mọi thay đổi chỉ nằm trong bộ nhớ.
function load(name, fallback) {
  const f = path.join(DATA_DIR, `${name}.json`);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : fallback;
}

export const state = {
  users: load('users', []),
  catalog: load('catalog', { services: [], extras: [], samples: [], reviews: [] }),
  conversations: load('conversations', []),
  schedule: load('schedule', { staff: [], rooms: [], busy: [] }),
  // 05-bookings (Dự) thêm mock/data/bookings.json; lịch dùng booking "Đã đặt lịch" để tính trùng.
  bookings: load('bookings', []),
};

export const userById = (id) => state.users.find((u) => u.id === id);

// Id tuần tự từ lúc khởi động: nextId('m', 3) → m-3, m-4…
const counters = {};
export function nextId(prefix, start) {
  counters[prefix] ??= start;
  return `${prefix}-${counters[prefix]++}`;
}

// "Hôm nay" của mock cố định theo câu chuyện (03-conversations.md, Quy tắc chung).
export const TODAY = '2026-10-21';
let clockMinutes = 9 * 60;
// Thời điểm cho bản ghi mới: trong ngày TODAY, mỗi lần gọi tiến thêm 1 phút.
export function now() {
  const m = clockMinutes++;
  const hh = String(Math.floor(m / 60) % 24).padStart(2, '0');
  const mm = String(m % 60).padStart(2, '0');
  return `${TODAY}T${hh}:${mm}:00+07:00`;
}

// ---- kiểm tra dữ liệu dùng chung ----
export const isString = (v) => typeof v === 'string';

export function isRealDate(v) {
  if (!isString(v) || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

export const isTime = (v) => isString(v) && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
export const toMinutes = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
export const toTime = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
export const OPEN = toMinutes('08:00');
export const CLOSE = toMinutes('20:00');

// "2026-10-24" → "24/10/2026"
export const viDate = (d) => d.split('-').reverse().join('/');
