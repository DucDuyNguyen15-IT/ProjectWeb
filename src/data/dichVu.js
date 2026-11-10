// Dữ liệu mẫu Màn 1 — khách xem dịch vụ và hỏi lịch.
// Giá gói Tốt nghiệp 1.800.000đ lấy từ đề; hai giá còn lại là giá mẫu, cần đối chiếu Figma PA#1.

export const DEFAULT_TOPIC = 'Gói Tốt nghiệp'

export const packages = [
  {
    id: 'ky-yeu',
    tag: 'Kỷ yếu lớp',
    name: 'Gói Kỷ yếu lớp trọn ngày – 40 học sinh, 2 thợ chụp, makeup và trang phục đồng bộ',
    topic: 'Gói Kỷ yếu lớp',
    description: 'Chụp cả ngày ở trường và studio, một video hậu trường cho cả lớp.',
    price: '15.000.000đ / lớp',
    photo: 'cả lớp 12 tung mũ trên sân trường',
  },
  {
    id: 'tot-nghiep',
    tag: 'Tốt nghiệp',
    name: 'Gói Tốt nghiệp',
    topic: 'Gói Tốt nghiệp',
    description: '2 giờ chụp trong nhà và sân vườn, makeup tự nhiên, 30 ảnh chỉnh màu.',
    price: '1.800.000đ',
    photo: 'tân cử nhân cầm bằng trước cổng trường',
  },
  {
    id: 'chan-dung',
    tag: 'Chân dung CV',
    name: 'Gói Chân dung CV',
    topic: 'Gói Chân dung CV',
    description: '45 phút, 2 trang phục, 5 ảnh chỉnh, giao file trong 3 ngày.',
    price: '600.000đ',
    photo: 'chân dung nền kem, áo sơ mi trắng',
  },
]

export const chatMessages = [
  { id: 1, from: 'me', text: 'Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?', time: '17:20' },
  { id: 2, from: 'studio', text: 'Để mình kiểm tra lịch cho bạn nhé', time: '17:21' },
]

export const gallery = [
  { caption: 'áo cử nhân ở sân trường', tone: 'bg-sand' },
  { caption: 'nhóm bạn tung mũ', tone: 'bg-brand-soft' },
  { caption: 'chân dung CV nền kem', tone: 'bg-line' },
  { caption: 'kỷ yếu lớp 12A3', tone: 'bg-sand' },
  { caption: 'ảnh đôi ngày tốt nghiệp', tone: 'bg-brand-soft' },
  { caption: 'gia đình chụp cùng tân cử nhân', tone: 'bg-line' },
]

export const steps = [
  { title: 'Tư vấn trong chat', text: 'Hỏi gói, giá và giờ trống ngay trên web. Studio trả lời trong giờ làm việc.' },
  { title: 'Chốt lịch và cọc 30%', text: 'Studio kiểm tra thợ và phòng, đề xuất giờ phù hợp. Bạn cọc 30% để giữ lịch.' },
  { title: 'Chụp ảnh', text: 'Có mặt sớm 10 phút để makeup. Thợ chụp hướng dẫn tạo dáng suốt buổi.' },
  { title: 'Chọn và nhận ảnh', text: 'Chọn ảnh cần chỉnh trong tài khoản, thanh toán 70% còn lại và nhận file.' },
]

export const reviews = [
  {
    quote: 'Studio báo trước thợ makeup kín lịch và đề xuất giờ khác ngay trong chat, mình không phải gọi điện hỏi lại.',
    name: 'Nguyễn Hải Yến',
    initial: 'Y',
    detail: 'Gói Tốt nghiệp',
  },
  {
    quote: 'Cả lớp 40 bạn mà buổi chụp vẫn đúng giờ. Chọn ảnh trong tài khoản rất tiện, không phải gửi qua Zalo.',
    name: 'Hồ Gia Bảo',
    initial: 'B',
    detail: 'Kỷ yếu Lớp 12A3',
  },
  {
    quote: 'Chụp chân dung CV nhanh, 3 ngày đã có file. Ảnh nền kem nhìn chuyên nghiệp.',
    name: 'Trần Minh Khoa',
    initial: 'K',
    detail: 'Gói Chân dung CV',
  },
]
