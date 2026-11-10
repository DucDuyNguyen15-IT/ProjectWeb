// Dữ liệu mẫu Màn 3. Mở thẳng /#/lich-chup luôn bắt đầu ở: Đã thống nhất lịch · Chờ cọc 30%.

export const booking = {
  code: 'GS-1024',
  title: 'Chụp ảnh tốt nghiệp',
  details: [
    ['Gói', 'Tốt nghiệp Premium'],
    ['Bao gồm', 'Makeup tự nhiên với thợ Mai · 2 giờ chụp trong nhà và sân vườn · 30 ảnh chỉnh màu'],
    ['Ngày', 'Thứ Bảy, 24/10/2026'],
    ['Bắt đầu', '13:00 (makeup)'],
  ],
  price: '1.800.000đ',
  deposit: '540.000đ',
  remaining: '1.260.000đ',
}

// Trạng thái booking: pending = chờ cọc, booked = đã cọc (sau "Thanh toán thành công").
export const BOOKING_STATUS = {
  pending: { label: 'Đã thống nhất lịch · Chờ cọc 30%', tone: 'brand' },
  booked: { label: 'Đã đặt lịch', tone: 'success' },
}

// shows: tab hiện booking ở những trạng thái nào. Số đếm tính từ trạng thái hiện tại.
export const TABS = [
  { id: 'all', label: 'Tất cả', shows: ['pending', 'booked', 'done'] },
  { id: 'pending', label: 'Chờ cọc', shows: ['pending'] },
  { id: 'booked', label: 'Đã đặt lịch', shows: ['booked'] },
  { id: 'done', label: 'Hoàn thành', shows: ['done'] },
]

export const week = {
  title: 'Tháng 10, 2026',
  label: 'Tuần 43',
  days: [
    ['T2', 19], ['T3', 20], ['T4', 21], ['T5', 22], ['T6', 23], ['T7', 24], ['CN', 25],
  ],
  selected: 24,
  dayTitle: 'Thứ Bảy, 24/10 · Ngày của bạn',
}

export const timeline = [
  { time: '09:00', title: 'Giờ bạn yêu cầu ban đầu', note: 'Thợ makeup đã kín lịch', icon: '×', cancelled: true },
  { time: '13:00 – 14:00', title: 'Makeup với Mai', note: 'Có mặt sớm 10 phút để chuẩn bị', icon: 'M' },
  { time: '14:00 – 16:00', title: 'Chụp ảnh với Tuấn', note: 'Studio đề xuất · Trong nhà và sân vườn', icon: 'C' },
]
