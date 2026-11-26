// Dữ liệu mẫu Màn 2. Trạng thái ban đầu theo đề: Linh hỏi 09:00, 09:00 bị trùng, chưa tạo được booking.
// Các bước bấm (Chọn giờ → Mô phỏng phản hồi của Linh → Tạo booking) theo prototype/LINK.md của PA#1.

export const customer = {
  name: 'Nguyễn Thùy Linh',
  initials: 'TL',
  email: 'linh.nguyen@email.com',
  phone: '0901 234 567',
  topic: 'Gói Tốt nghiệp',
}

export const initialMessages = [
  { id: 1, from: 'linh', who: 'Linh', time: '17:20', text: 'Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?' },
  { id: 2, from: 'studio', who: 'Thảo', time: '17:21', text: 'Để mình kiểm tra lịch cho bạn nhé' },
]

export const clash = {
  title: 'Trùng lịch lúc 09:00',
  text: 'Thợ makeup Mai đã có lịch 08:00–12:00. Không đủ nhân sự cho khung 09:00.',
}

// Mỗi gợi ý: giờ hiển thị, phân công, giá trị điền sẵn vào form, lời đề xuất và câu Linh chốt.
export const suggestions = [
  {
    id: '14',
    label: '14:00',
    detail: 'Makeup 13:00–14:00 · Mai. Chụp 14:00–16:00 · Tuấn · Phòng B',
    date: '24/10/2026 (Thứ Bảy)',
    time: '14:00',
    ok: '24/10 · 14:00: đủ thợ chụp, thợ makeup và phòng',
    proposal: 'Lúc 09:00 thợ makeup đã kín lịch. Studio đề xuất makeup 13:00–14:00 và chụp 14:00–16:00 cùng ngày, bạn chốt giờ này không?',
    agree: 'Dạ em chốt lịch 14:00 ạ.',
  },
  {
    id: '15',
    label: '15:00',
    detail: 'Makeup 14:00–15:00 · Mai. Chụp 15:00–17:00 · Tuấn · Phòng B',
    date: '24/10/2026 (Thứ Bảy)',
    time: '15:00',
    ok: '24/10 · 15:00: đủ thợ chụp, thợ makeup và phòng',
    proposal: 'Lúc 09:00 thợ makeup đã kín lịch. Studio đề xuất makeup 14:00–15:00 và chụp 15:00–17:00 cùng ngày, bạn chốt giờ này không?',
    agree: 'Dạ em chốt lịch 15:00 ạ.',
  },
  {
    id: '25',
    label: '25/10 · 09:00',
    detail: 'Ngày khác, đủ nhân sự. Makeup 08:00–09:00 · Mai. Chụp 09:00–11:00 · Tuấn · Phòng B',
    date: '25/10/2026 (Chủ nhật)',
    time: '09:00',
    ok: '25/10 · 09:00: đủ thợ chụp, thợ makeup và phòng',
    proposal: 'Ngày 24/10 buổi sáng thợ makeup đã kín lịch. Studio đề xuất Chủ nhật 25/10: makeup 08:00–09:00, chụp 09:00–11:00, bạn chốt giờ này không?',
    agree: 'Dạ em chốt Chủ nhật 25/10 lúc 09:00 ạ.',
  },
]

export const DECLINE_TEXT = 'Dạ giờ này em không tiện ạ.'

export const QUOTE_TEXT = 'Báo giá: Gói Tốt nghiệp Premium · 2 giờ chụp · makeup tự nhiên · 30 ảnh chỉnh màu · 1.800.000đ. Cọc 30% (540.000đ) để giữ lịch.'

// Trạng thái hội thoại của Linh theo bước demo.
export const LINH_STATUS = {
  open: { label: 'Đang tư vấn', tone: 'brand' },
  agreed: { label: 'Đã chốt lịch', tone: 'success' },
}

export const scheduleColumns = ['08–10', '10–12', '12–14', '14–16', '16–18']

// status: ok = Đã xác nhận, pending = Đang xét, clash = Trùng, off = Nghỉ, null = Trống
export const scheduleRows = [
  {
    resource: 'Makeup · Mai',
    cells: [
      { status: 'clash', text: 'Kỷ yếu 12A3 + Linh 09:00' },
      { status: 'ok', text: 'Tốt nghiệp · Ngân' },
      { status: 'pending', text: 'Linh · makeup 13:00', linh: true },
      null,
      null,
    ],
  },
  {
    resource: 'Thợ chụp · Tuấn',
    cells: [null, { status: 'ok', text: 'Chân dung · Khoa' }, { status: 'off', text: 'Nghỉ trưa' }, { status: 'pending', text: 'Linh · chụp 14:00', linh: true }, null],
  },
  {
    resource: 'Thợ chụp · Hà',
    cells: [null, { status: 'ok', text: 'Gia đình · Ngọc' }, { status: 'off', text: 'Nghỉ trưa' }, { status: 'ok', text: 'Cặp đôi · Vy' }, null],
  },
  {
    resource: 'Phòng A',
    cells: [null, { status: 'ok', text: 'Gia đình · Ngọc' }, null, { status: 'ok', text: 'Cặp đôi · Vy' }, null],
  },
  {
    resource: 'Phòng B',
    cells: [{ status: 'ok', text: 'Kỷ yếu 12A3' }, null, null, { status: 'pending', text: 'Linh · 14:00–16:00', linh: true }, null],
  },
]

export const STATUS = {
  ok: { label: 'Đã xác nhận', cell: 'border border-success bg-success-soft text-success', chip: 'success' },
  pending: { label: 'Đang xét', cell: 'border border-dashed border-brand bg-brand-soft text-brand', chip: 'brand' },
  clash: { label: 'Trùng', legend: 'Trùng lịch', cell: 'border border-danger bg-danger-soft text-danger', chip: 'danger' },
  off: { label: 'Nghỉ', cell: 'bg-sand text-muted', chip: 'sand' },
}

export const booking = {
  type: ['Tốt nghiệp cá nhân', 'Kỷ yếu lớp', 'Chân dung CV'],
  package: ['Gói Tốt nghiệp Premium · 2 giờ · 30 ảnh chỉnh', 'Gói Tốt nghiệp · 1 giờ · 15 ảnh chỉnh'],
  date: '24/10/2026 (Thứ Bảy)',
  times: ['09:00', '14:00', '15:00'],
  price: '1.800.000đ',
  staff: ['Makeup · Mai', 'Thợ chụp · Tuấn', 'Phòng B'],
}

// status dùng cho bộ lọc danh sách khách.
export const waiting = [
  { id: 'linh', initials: 'TL', name: 'Nguyễn Thùy Linh', time: '17:21', preview: 'Để mình kiểm tra lịch cho bạn nhé', status: 'Đang tư vấn', tone: 'brand', current: true },
  { id: 'khoa', initials: 'MK', name: 'Trần Minh Khoa', time: '16:58', preview: 'Chụp chân dung CV mất bao lâu ạ?', status: 'Chưa trả lời', tone: 'dark' },
  { id: 'bao', initials: '12A3', name: 'Hồ Gia Bảo · Lớp 12A3', time: 'Hôm qua', preview: 'Lớp mình chốt 24/10 nha studio', status: 'Đã xác nhận', tone: 'success', group: true },
  { id: 'han', initials: 'NH', name: 'Lê Ngọc Hân', time: '2 ngày trước', preview: 'Gói gia đình 4 người giá sao ạ?', status: 'Chưa trả lời', tone: 'dark' },
  { id: 'anh', initials: 'HA', name: 'Phạm Hoàng Anh', time: '3 ngày trước', preview: 'Cảm ơn studio, ảnh đẹp lắm.', status: 'Hoàn thành', tone: 'done' },
  {
    id: 'nguyen',
    initials: 'TN',
    name: 'Tôn Nữ Hoàng Phương Thảo Nguyên',
    time: '4 ngày trước',
    preview: 'Studio có nhận chụp ảnh tốt nghiệp ngoài trời ở Đà Lạt cho cả nhóm bạn không ạ?',
    status: 'Đang tư vấn',
    tone: 'brand',
  },
]

export const FILTERS = [
  { id: 'all', label: 'Tất cả', match: () => true },
  { id: 'unanswered', label: 'Chưa trả lời', match: (c) => c.status === 'Chưa trả lời' },
  { id: 'consulting', label: 'Đang tư vấn', match: (c) => c.status === 'Đang tư vấn' },
]
