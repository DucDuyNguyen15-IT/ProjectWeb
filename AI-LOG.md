# AI-LOG.md — nhật ký làm việc với assistant

Mỗi mục là một trang hoặc một nhiệm vụ đã giao cho assistant. Prompt nguyên văn nằm trong `brief.md`.

## 1. Rules file và cài đặt dự án — 04/11/2026
- Người làm: Nguyễn Đức Duy
- Tool: Claude Code (Claude Opus 5.5)
- Request: Prompt 1 trong brief.md: git init, viết CLAUDE.md theo stack Tailwind v4 và
  danh sách NEVER, chép ảnh PA#1 vào docs/pa1/, cài Tailwind CLI và build css/tailwind.css.
- Kết quả: commit 2741335 (CLAUDE.md), 0f5bda6 (docs/pa1), 71bfc6b (Tailwind).
- Changed: assistant tự đặt git user.name của repo thành "Nguyễn Đức Duy" thay vì tên
  GitHub "DucDuyNguyen15-IT" để lịch sử commit đúng tên thật; mình giữ thay đổi này.
  Bỏ PA2-rubric-responsive-prototype.pdf ra khỏi repo; chuyển file phân công vào docs/.
- Rejected: không có.
- Đã kiểm tra: đọc lại CLAUDE.md trước khi commit; git log cho thấy commit đầu chỉ có
  CLAUDE.md; npm run build tạo được css/tailwind.css.

## 2. Lên ý tưởng bố cục 3 màn — 04/11/2026
- Người làm: Nguyễn Đức Duy
- Tool: Claude Code (Claude Opus 5.5), skill superpowers:brainstorming
- Request: Prompt 2 trong brief.md: hỏi từng câu kèm sơ đồ ASCII để chốt bố cục mỗi màn
  ở 360/768/1280, phần không làm được khi tắt JS, link luồng chính, mục dài, Not wired yet.
- Kết quả: docs/design/LAYOUT.md (commit c715067). 11 câu hỏi, mình chọn phương án đề xuất
  ở 10 câu; ở câu "các mục dưới hero Màn 1" mình chọn làm đầy đủ như Figma (gói chụp,
  ảnh mẫu, quy trình, đánh giá) thay vì phương án gọn assistant đề xuất.
- Changed: mình yêu cầu đổi tên "Linh" trên trang khách thành lời chung ("Tài khoản của
  tôi", "Bạn"); assistant cảnh báo đổi cả trang Admin sẽ mất tính thực tế của dữ liệu,
  nên chỉ đổi Màn 1 và Màn 3, Màn 2 giữ "Nguyễn Thùy Linh".
- Rejected: menu gập <details> cho header ở 360px (link bị ẩn khi tắt JS, script chấm có
  thể coi là thiếu nội dung); thanh demo nổi như PA#1 (che nội dung ở 360px); nút
  thanh toán disabled (thứ quan trọng nhất bị mờ, dễ trượt tương phản).
- Đã kiểm tra: đối chiếu từng màn với docs/pa1/ và LINK.md; mỗi khác biệt có lý do trong
  bảng Changed since PA#1; bảng rủi ro rubric ở cuối LAYOUT.md.

## 3. Design System: token màu, chữ, spacing — 04/11/2026
- Người làm: Nguyễn Đức Duy
- Tool: Claude Code (Claude Opus 5.5), skill ui-ux-pro-max, MCP claude-artifacts (Design System)
- Request: Prompt 3 trong brief.md: lấy màu từ ảnh PA#1, kiểm tra tương phản từng cặp
  chữ/nền, sửa cặp không đạt, chốt thang chữ/bo góc/nút, tạo artifact Design System,
  viết @theme và docs/design/TOKENS.md.
- Kết quả: commit 1e1805a; 27 cặp chữ/nền đều ≥ 4.5:1; artifact
  https://claude.ai/artifact/PJtrtw715d1WC7UWRGEkCL.
- Changed: 7 sắc chữ phụ của PA#1 không đạt (2.27–3.95:1) → gộp thành token muted;
  brand #8e6126 → #8a5e25 (4.39:1 trên nhãn Chờ cọc); chữ vàng trên nền sáng (2.30:1)
  → dùng brand; eyebrow hero → gold-light với lớp phủ cố định 80%.
- Sai và đã sửa: assistant chọn muted #70685e lần đầu; chạy lại script tương phản trên
  cả nền phụ thì chỉ đạt 4.46:1 trên brand-soft và 4.44:1 trên danger-soft → đổi
  #6f675d. Viền ô nhập #9a8d7c chỉ 2.92:1 trên sand-soft (cần 3:1) → #928472.
- Rejected: bảng màu "Photography Studio" của ui-ux-pro-max (đen/trắng thuần) vì khác
  hẳn PA#1; chỉ dùng quy tắc kiểm tra của skill.
- Đã kiểm tra: script tính tỉ lệ WCAG cho từng cặp (bảng trong TOKENS.md); npm run build
  chạy được; sẽ kiểm tra lại bằng DevTools colour picker khi có trang.
