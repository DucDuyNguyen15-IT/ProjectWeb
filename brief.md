# brief.md — các prompt nhóm đã gửi cho assistant cho PA#3 (nguyên văn, theo thứ tự)

Bản PA#2 của file này vẫn còn trong lịch sử git. Contract `docs/api/README.md` và các file 01–04 được viết trước file này. Quá trình viết contract được ghi trong `AI-LOG.md` (mục 1–5).

## Prompt 1 — Nguyễn Đức Duy · Claude Code (Claude Opus 5.5) · 26/11/2026

Mock server: phần lõi và các endpoint của contract 01–04.

```
Bối cảnh: PA#3 GradStudio (rubric PA#3, mục "The mock"). Contract đã commit trong docs/api/:
README.md (base /api, Bearer token, dạng lỗi chung, mã trạng thái, quy ước, bảng 35 endpoint),
01-auth.md, 02-catalog.md, 03-conversations.md, 04-schedule.md. Các file 05–10 do Dự viết sau.
Luật dự án ở CLAUDE.md, mục "Contract và mock".

Việc cần làm: viết mock/server.mjs và mock/data/ sao cho mock trả lời ĐÚNG như contract 01–04.

Yêu cầu bắt buộc:
1. Chỉ dùng module có sẵn của Node (node:http, node:fs, node:path, node:url…). Không có
   package.json, không cần npm install. Chạy bằng `node mock/server.mjs`, cổng lấy từ PORT,
   mặc định 3001.
2. Dữ liệu khởi đầu nằm trong mock/data/*.json, kể đúng câu chuyện trong contract (Linh,
   Thảo, Mai bận 08:00–12:00 ngày 24/10/2026, Tuấn, Hà, Phòng A/B, c-linh và 3 hội thoại khác,
   GS-1023…). Mọi thay đổi chỉ giữ trong bộ nhớ, restart thì về lại như ban đầu.
3. MOCK_MODE: normal (trả lời sau khoảng 150 ms), slow (sau 2 s), error (500 với dạng lỗi chung
   cho mọi request trừ POST /api/auth/login), empty (mọi list trong câu trả lời là [], kể cả list
   lồng trong object; object đơn lẻ vẫn trả bình thường). Làm empty ở một chỗ chung (lúc gửi
   câu trả lời), không rải trong từng handler.
4. Token dạng token-<user id>, đọc từ Authorization: Bearer; vẫn dùng được sau khi restart.
   401/403 theo đúng README.
5. In một dòng cho mỗi request: METHOD path status.
6. Cấu trúc để Dự thêm file 05–10 song song mà ít xung đột: phần lõi (server, router, gửi JSON,
   lỗi, đọc token, mode) trong mock/server.mjs; handler mỗi resource một file trong
   mock/routes/ (auth, catalog, conversations, schedule); kiểm tra trùng lịch đặt ở chỗ dùng
   chung để 05-bookings gọi lại được khi đổi giờ booking.
7. Đường dẫn không có trong contract → 404 NOT_FOUND với dạng lỗi chung. Body JSON hỏng → 400.
8. Ảnh mẫu /api/files/samples/<id>.svg: trả một SVG minh họa đơn giản (không ảnh người thật).
   Endpoint này chỉ phục vụ ảnh, không nằm trong contract-check.

KHÔNG được sửa docs/api/. Nếu thấy contract mâu thuẫn hoặc thiếu thì dừng lại và báo, không tự
đổi contract cho khớp với code.

Xong khi:
- `node tools/contract-check.mjs` trên mock vừa khởi động: mọi ví dụ của README, 01, 02, 03, 04
  PASS (các dòng "no example" của endpoint 05–10 là chuyện của file chưa viết).
- Chạy thử 4 chế độ bằng curl: slow trả chậm, error trả 500 nhưng login vẫn 200, empty trả list
  rỗng, restart xong token cũ vẫn dùng được.
- `git diff -- docs/api` trống.
```
