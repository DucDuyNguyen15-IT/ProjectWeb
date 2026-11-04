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
