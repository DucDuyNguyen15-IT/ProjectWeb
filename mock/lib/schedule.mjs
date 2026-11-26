// Kiểm tra trùng lịch theo 04-schedule.md. Dùng chung cho POST /api/schedule/check,
// POST /api/conversations/:id/proposals (03) và đổi giờ booking ở 05 (truyền excludeBookingId).
import { state, isRealDate, isTime, toMinutes, toTime, OPEN, CLOSE, TODAY } from './core.mjs';

const staffById = (id) => state.schedule.staff.find((s) => s.id === id);
const roomById = (id) => state.schedule.rooms.find((r) => r.id === id);
const resourceName = (id) => (staffById(id) || roomById(id) || {}).name || id;

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Gom lỗi của date/makeup/shoot vào `fields` theo khóa có dấu chấm ("shoot.end"…).
// futureOnly: ngày phải từ "hôm nay" của mock trở đi (đề xuất ở 03); check ở 04 chỉ cần ngày có thật.
export function validateSlot(body, { futureOnly = false } = {}) {
  const fields = {};
  if (!isRealDate(body.date)) fields.date = 'Ngày phải có dạng YYYY-MM-DD.';
  else if (futureOnly && body.date < TODAY) fields.date = 'Ngày phải từ hôm nay trở đi.';

  const { makeup, shoot } = body;
  const timeErr = (prefix, part, label) => {
    let ok = true;
    if (!isTime(part.start)) { fields[`${prefix}.start`] = `Nhập giờ bắt đầu ${label} (HH:mm).`; ok = false; }
    else if (toMinutes(part.start) < OPEN || toMinutes(part.start) >= CLOSE) { fields[`${prefix}.start`] = 'Giờ phải trong giờ mở cửa 08:00–20:00.'; ok = false; }
    if (!isTime(part.end)) { fields[`${prefix}.end`] = `Nhập giờ kết thúc ${label}.`; ok = false; }
    else if (ok && toMinutes(part.end) <= toMinutes(part.start)) { fields[`${prefix}.end`] = 'Giờ kết thúc phải sau giờ bắt đầu.'; ok = false; }
    else if (toMinutes(part.end) > CLOSE) { fields[`${prefix}.end`] = 'Giờ kết thúc không được sau 20:00.'; ok = false; }
    return ok;
  };

  let shootOk = false;
  if (!isObject(shoot)) fields.shoot = 'Nhập giờ chụp, thợ chụp và phòng.';
  else {
    shootOk = timeErr('shoot', shoot, 'buổi chụp');
    const st = staffById(shoot.staffId);
    if (!st) fields['shoot.staffId'] = 'Chọn thợ chụp.';
    else if (st.skill !== 'photo') fields['shoot.staffId'] = `${st.name} không chụp ảnh. Chọn thợ chụp.`;
    if (!roomById(shoot.roomId)) fields['shoot.roomId'] = 'Phòng không tồn tại.';
  }

  if (makeup !== undefined && makeup !== null) {
    if (!isObject(makeup)) fields.makeup = 'Makeup phải là object hoặc null.';
    else {
      const ok = timeErr('makeup', makeup, 'makeup');
      if (ok && shootOk && toMinutes(makeup.end) > toMinutes(shoot.start)) fields['makeup.end'] = 'Makeup phải xong trước giờ chụp.';
      const st = staffById(makeup.staffId);
      if (!st) fields['makeup.staffId'] = 'Chọn thợ makeup.';
      else if (st.skill !== 'makeup') fields['makeup.staffId'] = `${st.name} không làm makeup. Chọn thợ makeup.`;
    }
  }
  return fields;
}

// Lịch bận của một tài nguyên trong một ngày: lịch có sẵn + booking "Đã đặt lịch" (trừ excludeBookingId).
// Booking ở 05 cần có dạng {id, status, date, customer: {name}, makeup: {start,end,staffId}|null, shoot: {start,end,staffId,roomId}}.
export function busyOf(resourceId, date, excludeBookingId) {
  const fixed = state.schedule.busy.filter((b) => b.date === date && b.resourceId === resourceId);
  const fromBookings = [];
  for (const bk of state.bookings) {
    if (bk.status !== 'Đã đặt lịch' || bk.date !== date || bk.id === excludeBookingId) continue;
    const label = `${bk.id} · ${bk.customer?.name ?? ''}`.trim();
    if (bk.makeup?.staffId === resourceId) fromBookings.push({ start: bk.makeup.start, end: bk.makeup.end, label, activity: `makeup cho booking ${bk.id}` });
    if (bk.shoot?.staffId === resourceId) fromBookings.push({ start: bk.shoot.start, end: bk.shoot.end, label, activity: `chụp booking ${bk.id}` });
    if (bk.shoot?.roomId === resourceId) fromBookings.push({ start: bk.shoot.start, end: bk.shoot.end, label, activity: `dùng cho booking ${bk.id}` });
  }
  return [...fixed, ...fromBookings].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
}

const overlaps = (s, e, b) => s < toMinutes(b.end) && toMinutes(b.start) < e;

// Các phần của một lịch: [tài nguyên, giờ bắt đầu, giờ kết thúc, nhãn phần] theo thứ tự makeup, thợ chụp, phòng.
function parts(slot) {
  const list = [];
  if (slot.makeup) list.push([slot.makeup.staffId, slot.makeup.start, slot.makeup.end, 'makeup']);
  list.push([slot.shoot.staffId, slot.shoot.start, slot.shoot.end, 'chụp']);
  list.push([slot.shoot.roomId, slot.shoot.start, slot.shoot.end, 'chụp']);
  return list;
}

export function findClashes(slot, excludeBookingId) {
  const clashes = [];
  for (const [rid, start, end, label] of parts(slot)) {
    const s = toMinutes(start), e = toMinutes(end);
    for (const b of busyOf(rid, slot.date, excludeBookingId)) {
      if (!overlaps(s, e, b)) continue;
      const name = resourceName(rid);
      const os = toTime(Math.max(s, toMinutes(b.start))), oe = toTime(Math.min(e, toMinutes(b.end)));
      clashes.push({ resourceId: rid, resourceName: name, busyStart: b.start, busyEnd: b.end,
        reason: `${name} đang ${b.activity || b.label} từ ${b.start} đến ${b.end}, trùng giờ ${label} ${os}–${oe}.` });
    }
  }
  return clashes;
}

const listVi = (names) => (names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} và ${names.at(-1)}`);

// Rảnh và cách lịch bận ngay trước đó ít nhất 60 phút (luật chỉ dùng cho gợi ý, 04-schedule.md).
function freeWithBuffer(rid, date, s, e, excludeBookingId) {
  return busyOf(rid, date, excludeBookingId).every((b) =>
    !overlaps(s, e, b) && (toMinutes(b.end) > s || s - toMinutes(b.end) >= 60));
}

function suggest(slot, excludeBookingId) {
  const dm = slot.makeup ? toMinutes(slot.makeup.end) - toMinutes(slot.makeup.start) : 0;
  const ds = toMinutes(slot.shoot.end) - toMinutes(slot.shoot.start);
  const wanted = toMinutes(slot.makeup ? slot.makeup.start : slot.shoot.start);
  const withSkill = (skill, first) => [first, ...state.schedule.staff.filter((s) => s.skill === skill && s.id !== first).map((s) => s.id)];
  const makeupStaff = slot.makeup ? withSkill('makeup', slot.makeup.staffId) : [null];
  const shootStaff = withSkill('photo', slot.shoot.staffId);
  const rooms = [slot.shoot.roomId, ...state.schedule.rooms.filter((r) => r.id !== slot.shoot.roomId).map((r) => r.id)];

  const found = [];
  for (let start = OPEN; start + dm + ds <= CLOSE; start += 60) {
    const ms = start, ss = start + dm, se = ss + ds;
    const m = makeupStaff.find((id) => id === null || freeWithBuffer(id, slot.date, ms, ss, excludeBookingId));
    const p = shootStaff.find((id) => freeWithBuffer(id, slot.date, ss, se, excludeBookingId));
    const r = rooms.find((id) => freeWithBuffer(id, slot.date, ss, se, excludeBookingId));
    if (m === undefined || !p || !r) continue;
    found.push({
      start,
      date: slot.date,
      makeup: m === null ? null : { start: toTime(ms), end: toTime(ss), staffId: m, staffName: resourceName(m) },
      shoot: { start: toTime(ss), end: toTime(se), staffId: p, staffName: resourceName(p), roomId: r, roomName: resourceName(r) },
    });
  }
  found.sort((a, b) => Math.abs(a.start - wanted) - Math.abs(b.start - wanted) || a.start - b.start);
  return found.slice(0, 2).map(({ start, ...s }, i, arr) => {
    const diff = (start - arr[0].start) / 60;
    const label = i === 0 ? 'Gần nhất' : diff > 0 ? `Muộn hơn ${diff} giờ` : `Sớm hơn ${-diff} giờ`;
    return { ...s, label };
  });
}

// Câu trả lời đầy đủ của POST /api/schedule/check (slot đã hợp lệ).
export function checkSlot(slot, excludeBookingId) {
  const clashes = findClashes(slot, excludeBookingId);
  const first = slot.makeup ? slot.makeup.start : slot.shoot.start;
  if (!clashes.length) {
    const names = [slot.makeup && resourceName(slot.makeup.staffId), resourceName(slot.shoot.staffId), resourceName(slot.shoot.roomId)].filter(Boolean);
    return { available: true, summary: `${first}–${slot.shoot.end} còn trống: ${listVi(names)} đều rảnh.`, clashes: [], suggestions: [] };
  }
  const suggestions = suggest(slot, excludeBookingId);
  let summary = `${first} bị trùng: ${clashes.map((c) => `${c.resourceName} đã có lịch ${c.busyStart}–${c.busyEnd}`).join(', ')}.`;
  if (!suggestions.length) summary += ' Ngày này không còn giờ trống phù hợp.';
  return { available: false, summary, clashes, suggestions };
}

// Gắn tên nhân viên/phòng vào slot để trả về trong proposal/booking.
export function namedSlot(slot) {
  return {
    makeup: slot.makeup ? { start: slot.makeup.start, end: slot.makeup.end, staffId: slot.makeup.staffId, staffName: resourceName(slot.makeup.staffId) } : null,
    shoot: { start: slot.shoot.start, end: slot.shoot.end, staffId: slot.shoot.staffId, staffName: resourceName(slot.shoot.staffId), roomId: slot.shoot.roomId, roomName: resourceName(slot.shoot.roomId) },
  };
}
