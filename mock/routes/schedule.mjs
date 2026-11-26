// 04-schedule.md — chỉ admin.
import { state, requireRole, isRealDate, throwIfInvalid, notFound } from '../lib/core.mjs';
import { busyOf, validateSlot, checkSlot } from '../lib/schedule.mjs';

function resources({ user }) {
  requireRole(user, ['admin']);
  return { status: 200, body: { staff: state.schedule.staff, rooms: state.schedule.rooms } };
}

function day({ user, query }) {
  requireRole(user, ['admin']);
  throwIfInvalid(isRealDate(query.date) ? {} : { date: 'Chọn ngày (YYYY-MM-DD).' });
  const row = (r, kind) => ({
    resourceId: r.id, resourceName: r.name, kind,
    busy: busyOf(r.id, query.date).map(({ start, end, label }) => ({ start, end, label })),
  });
  return { status: 200, body: { date: query.date, rows: [...state.schedule.staff.map((s) => row(s, 'staff')), ...state.schedule.rooms.map((r) => row(r, 'room'))] } };
}

function check({ user, body }) {
  requireRole(user, ['admin']);
  throwIfInvalid(validateSlot(body));
  const ex = body.excludeBookingId;
  if (ex !== undefined && ex !== null && !state.bookings.some((b) => b.id === ex)) throw notFound(`Không tìm thấy booking ${ex}.`);
  return { status: 200, body: checkSlot(body, ex) };
}

export const routes = [
  ['GET', '/api/resources', resources],
  ['GET', '/api/schedule', day],
  ['POST', '/api/schedule/check', check],
];
