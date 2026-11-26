// 03-conversations.md. Thứ tự kiểm tra: 401 → 403 (vai trò) → 404 → 403 (không phải của mình) → 400 → 409.
import {
  state, requireRole, publicUser, forbidden, notFound, conflict, throwIfInvalid,
  isString, isRealDate, isTime, toMinutes, OPEN, CLOSE, TODAY, nextId, now, viDate,
} from '../lib/core.mjs';
import { validateSlot, findClashes, namedSlot } from '../lib/schedule.mjs';

const STATUSES = ['Chưa trả lời', 'Đang tư vấn', 'Đã chốt lịch', 'Hoàn thành'];

function findConversation(id) {
  const c = state.conversations.find((x) => x.id === id);
  if (!c) throw notFound('Không tìm thấy hội thoại.');
  return c;
}

function ensureOwn(user, c, message = 'Bạn không có quyền xem hội thoại này.') {
  if (user.role === 'customer' && c.customer.id !== user.id) throw forbidden(message);
}

// Tin của phía bên kia gửi sau tin cuối cùng của phía người gọi.
function unreadFor(user, c) {
  const mine = (m) => (user.role === 'customer' ? m.sender.role === 'customer' : m.sender.role !== 'customer');
  let count = 0;
  for (const m of c.messages) count = mine(m) ? 0 : count + 1;
  return count;
}

function summary(user, c) {
  const last = c.messages.at(-1);
  return {
    id: c.id, customer: c.customer, status: c.status,
    lastMessage: { text: last.text, sentAt: last.sentAt },
    unread: unreadFor(user, c), updatedAt: last.sentAt,
  };
}

function list({ user, query }) {
  requireRole(user, ['customer', 'admin']);
  if (query.status !== undefined) throwIfInvalid(STATUSES.includes(query.status) ? {} : { status: 'Trạng thái phải là Chưa trả lời, Đang tư vấn, Đã chốt lịch hoặc Hoàn thành.' });
  const rows = state.conversations
    .filter((c) => user.role === 'admin' || c.customer.id === user.id)
    .filter((c) => query.status === undefined || c.status === query.status)
    .map((c) => summary(user, c))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return { status: 200, body: { conversations: rows } };
}

function detail({ user, params }) {
  requireRole(user, ['customer', 'admin']);
  const c = findConversation(params.id);
  ensureOwn(user, c);
  const { id, customer, status, topic, messages, proposals } = c;
  return { status: 200, body: { conversation: { id, customer, status, topic, messages, proposals } } };
}

function addMessage(c, user, fields) {
  const message = { id: nextId('m', 3), type: 'text', sender: publicUser(user), text: '', sentAt: now(), requestDetails: null, proposalId: null, ...fields };
  c.messages.push(message);
  return message;
}

function sendMessage({ user, params, body }) {
  requireRole(user, ['customer', 'admin']);
  const c = findConversation(params.id);
  ensureOwn(user, c, 'Bạn không có quyền gửi tin vào hội thoại này.');
  const text = isString(body.text) ? body.text.trim() : '';
  if (!text) throwIfInvalid({ text: 'Nhập nội dung tin nhắn.' });
  if (text.length > 1000) throwIfInvalid({ text: 'Tin nhắn tối đa 1000 ký tự.' });
  if (user.role === 'admin' && c.status === 'Chưa trả lời') c.status = 'Đang tư vấn';
  return { status: 201, body: { message: addMessage(c, user, { text }) } };
}

function sendRequest({ user, params, body }) {
  requireRole(user, ['customer'], 'Chỉ khách hàng mới gửi được yêu cầu đặt lịch.');
  const c = findConversation(params.id);
  ensureOwn(user, c, 'Bạn không có quyền gửi yêu cầu vào hội thoại này.');

  const fields = {};
  const service = state.catalog.services.find((s) => s.id === body.serviceId);
  if (!body.serviceId) fields.serviceId = 'Chọn dịch vụ.';
  else if (!service) fields.serviceId = 'Không có dịch vụ này.';
  const pkgGiven = body.packageId !== undefined && body.packageId !== null && body.packageId !== '';
  const pkg = service && pkgGiven ? service.packages.find((p) => p.id === body.packageId) : null;
  if (service && pkgGiven && !pkg) fields.packageId = 'Gói không thuộc dịch vụ đã chọn.';
  if (!isRealDate(body.preferredDate)) fields.preferredDate = 'Chọn ngày (YYYY-MM-DD).';
  else if (body.preferredDate < TODAY) fields.preferredDate = 'Ngày phải từ hôm nay trở đi.';
  if (!isTime(body.preferredTime)) fields.preferredTime = 'Chọn giờ (HH:mm).';
  else if (toMinutes(body.preferredTime) < OPEN || toMinutes(body.preferredTime) >= CLOSE) fields.preferredTime = 'Giờ phải trong giờ mở cửa 08:00–20:00.';
  const extraIds = body.extraIds ?? [];
  const validExtra = (id) => state.catalog.extras.some((x) => x.id === id);
  if (!Array.isArray(extraIds) || !extraIds.every(validExtra) || new Set(extraIds).size !== extraIds.length) fields.extraIds = 'Dịch vụ thêm không hợp lệ.';
  const note = body.note ?? null;
  if (note !== null && (!isString(note) || note.length > 500)) fields.note = 'Ghi chú tối đa 500 ký tự.';
  throwIfInvalid(fields);

  const extras = extraIds.map((id) => state.catalog.extras.find((x) => x.id === id).name);
  const text = `Yêu cầu đặt lịch: ${pkg ? pkg.name : service.name}, ${viDate(body.preferredDate)} lúc ${body.preferredTime}${extras.length ? `, thêm ${extras.join(', ')}` : ''}.`;
  const requestDetails = { serviceId: service.id, packageId: pkg ? pkg.id : null, preferredDate: body.preferredDate, preferredTime: body.preferredTime, extraIds, note };
  return { status: 201, body: { message: addMessage(c, user, { type: 'request', text, requestDetails }) } };
}

function propose({ user, params, body }) {
  requireRole(user, ['admin'], 'Chỉ admin mới gửi được đề xuất lịch.');
  const c = findConversation(params.id);
  throwIfInvalid(validateSlot(body, { futureOnly: true }));
  if (c.status === 'Đã chốt lịch' || c.status === 'Hoàn thành') throw conflict(`Hội thoại đã ở trạng thái "${c.status}", không gửi thêm đề xuất.`);
  const clashes = findClashes(body);
  if (clashes.length) throw conflict(`Trùng lịch: ${clashes.map((x) => `${x.resourceName} đã có lịch ${x.busyStart}–${x.busyEnd}`).join(', ')} ngày ${viDate(body.date)}.`);

  const slot = namedSlot(body);
  const proposal = { id: nextId('p', 1), date: body.date, ...slot, status: 'Chờ khách trả lời', createdAt: now() };
  c.proposals.push(proposal);
  const parts = [slot.makeup && `makeup ${slot.makeup.start}–${slot.makeup.end} với ${slot.makeup.staffName}`, `chụp ${slot.shoot.start}–${slot.shoot.end} với ${slot.shoot.staffName} ở ${slot.shoot.roomName}`].filter(Boolean);
  const message = addMessage(c, user, { type: 'proposal', text: `Đề xuất lịch ${viDate(body.date)}: ${parts.join(', ')}.`, proposalId: proposal.id, sentAt: proposal.createdAt });
  return { status: 201, body: { proposal, message } };
}

function answer({ user, params, body }) {
  requireRole(user, ['customer'], 'Chỉ khách hàng mới trả lời được đề xuất.');
  const c = findConversation(params.id);
  const p = c.proposals.find((x) => x.id === params.proposalId);
  if (!p) throw notFound('Không tìm thấy đề xuất.');
  ensureOwn(user, c, 'Bạn không có quyền trả lời đề xuất này.');
  throwIfInvalid(['accept', 'decline'].includes(body.answer) ? {} : { answer: 'Câu trả lời phải là accept hoặc decline.' });
  if (p.status !== 'Chờ khách trả lời') throw conflict('Đề xuất này đã được trả lời.');

  if (body.answer === 'accept') {
    p.status = 'Đã đồng ý';
    c.status = 'Đã chốt lịch';
  } else p.status = 'Đã từ chối';
  return { status: 200, body: { proposal: p, conversation: { id: c.id, status: c.status } } };
}

export const routes = [
  ['GET', '/api/conversations', list],
  ['GET', '/api/conversations/:id', detail],
  ['POST', '/api/conversations/:id/messages', sendMessage],
  ['POST', '/api/conversations/:id/requests', sendRequest],
  ['POST', '/api/conversations/:id/proposals', propose],
  ['POST', '/api/conversations/:id/proposals/:proposalId/answer', answer],
];
