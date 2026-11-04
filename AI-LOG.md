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
