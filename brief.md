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

## Prompt 2 — Nguyễn Đức Duy · Claude Code (Claude Opus 5.5) · 26/11/2026

Front-end: phần dùng chung (gọi API, đăng nhập, route bảo vệ, 3 trạng thái dữ liệu, form) và bước G2.

```
Bối cảnh: PA#3 GradStudio. Contract đã commit trong docs/api/ (README + 01–04), mock đã chạy
(`node mock/server.mjs`, 48/48 ví dụ PASS). App React của PA#2 nằm trong client/ (React +
Vite + Tailwind v4 + react-router HashRouter); vite.config.js đã proxy /api → localhost:3001.
Luật ở CLAUDE.md (mục "Front-end — luật bắt buộc", "Design token", "Responsive và semantic",
"NEVER"). Bước này làm phần nền mà cả Duy (G1–G6) và Dự (G7–G11) dùng chung, nên phải xong và
push trước khi làm màn hình.

Việc cần làm:
1. client/src/api/client.js — nơi DUY NHẤT gọi fetch. Hàm apiFetch(path, {method, body,
   token, signal}): chỉ nhận đường dẫn tương đối /api/...; tự gắn Authorization: Bearer khi
   có token; body object → JSON. Trả về JSON khi 2xx. Khi lỗi, ném ApiError {status, code,
   message, fields} đọc từ dạng lỗi chung của docs/api/README.md (mạng hỏng → status 0, câu
   báo tiếng Việt). Không viết URL tuyệt đối.
2. client/src/auth/: AuthContext + AuthProvider + hook useAuth() → {user, token, status,
   login(email, password), logout()}. Đăng nhập gọi POST /api/auth/login (01-auth.md). Lưu
   token vào localStorage để reload vẫn còn phiên; khi mở app có token thì gọi GET
   /api/auth/me đúng MỘT lần để lấy user (đang kiểm tra → màn đang tải; 401 → xóa token;
   lỗi khác → màn lỗi có nút Thử lại). Vai trò chỉ đọc từ user do API trả về, không từ URL.
   logout() xóa user và token. Request nào trả 401 khi đang có token thì cũng đăng xuất.
3. ProtectedRoute (roles=[...]): chưa đăng nhập → chuyển tới /dang-nhap, nhớ trang đang mở
   (cả pathname và search), đăng nhập xong quay lại đúng trang đó. Sai vai trò → màn
   "Không có quyền" có h1, lý do và link về trang chủ của vai trò mình (không phải trang
   trắng, không tự chuyển đi).
4. Trang chủ theo vai trò, hằng số dùng chung ROLE_HOME: customer → /tai-khoan,
   admin → /admin/hoi-thoai, staff → /nhan-vien/viec, superadmin → /superadmin/admin.
   Bước này chỉ tạo /tai-khoan (trang tài khoản của khách: lời chào theo user.name và các
   link sang các màn của khách; Dự sẽ thêm danh sách nhắc lịch ở G7). Ba trang chủ còn lại
   là việc của bước sau; tạm thời đường dẫn của chúng chưa có trong App.jsx.
5. Hook useApi(path) cho màn đọc dữ liệu: trả {data, error, loading, reload}; gửi đúng một
   request mỗi lần tải (dùng AbortController khi đổi path hoặc unmount để StrictMode không
   gây request thừa); reload() tải lại mà không reload trang. Ba component trạng thái dùng
   chung: LoadingState (có chữ "Đang tải…", role="status"), ErrorState (hiện message của
   API + nút Thử lại gọi reload), EmptyState (câu báo rỗng do màn truyền vào).
6. Form: mở rộng client/src/components/Field.jsx (TextField, SelectField, CheckField) để
   nhận `error`: hiện thông báo ngay dưới field, id riêng, gắn bằng aria-describedby và
   aria-invalid. Hook useFormErrors (hoặc tương tự, viết tay, không thêm thư viện): chỉ hiện
   lỗi sau lần gửi đầu tiên; nhận fields của ApiError 400 để hiện đúng field; giữ nguyên
   giá trị đã nhập khi lỗi; cờ submitting để khóa nút gửi khi request đang chạy.
7. Màn đăng nhập /dang-nhap (G2): một ô e-mail (type="email"), một ô mật khẩu, một nút
   submit "Đăng nhập". Kiểm tra trước khi gửi đúng giới hạn của 01-auth.md (email 3–254 ký
   tự, có @; mật khẩu 1–128). 400 → lỗi theo field; 401 → câu báo của API ngay trên form.
   Thành công → về trang đang mở dở, hoặc ROLE_HOME của vai trò. Không có nút demo hay
   link chọn vai trò; có thể ghi bảng tài khoản demo dạng chữ để người chấm biết.
8. Header dùng chung đọc useAuth(): chưa đăng nhập → link Dịch vụ và Đăng nhập; đã đăng
   nhập → link các màn của vai trò đó (chỉ những màn đã có trong App.jsx), tên người dùng
   và nút Đăng xuất (button, xong thì về /). Bỏ DemoNav của PA#2 khỏi mọi màn.
9. Trang 404 cho mọi đường dẫn lạ (h1 + link về trang chủ). Giữ ScrollToTop.

Ràng buộc:
- Chỉ gọi endpoint có trong docs/api/. Thiếu endpoint hay thiếu field thì DỪNG và báo,
  không bịa. Không sửa docs/api/ và mock/.
- Không thêm dependency. Không viết dữ liệu luồng chính vào component.
- Chuyển màn bằng <Link>/<Navigate>/form submit; useNavigate chỉ dùng sau đăng nhập, đăng
  xuất và khi bị chặn.
- Giữ token, spacing scale, breakpoint, semantic, min-h-11 của CLAUDE.md. Mỗi màn một <h1>,
  có header/nav/main/footer, input có label.
- Giữ nguyên các route PA#2 hiện có (/, /hoi-thoai, /lich-chup); các bước sau sẽ thay chúng.

Xong khi:
- `npm run build` không lỗi; `npx vite preview` + mock normal: đăng nhập lần lượt linh,
  thao, mai, tuan, superadmin → đúng trang chủ (ba trang chưa có thì hiện 404, ghi rõ trong
  báo cáo); đăng xuất về /.
- Mở thẳng /#/tai-khoan khi chưa đăng nhập → /#/dang-nhap → đăng nhập linh → về /#/tai-khoan.
  Đăng nhập thao rồi mở /#/tai-khoan → màn "Không có quyền". Reload /#/tai-khoan khi đã
  đăng nhập → vẫn ở đó. /#/khong-co → 404.
- Form đăng nhập: gửi rỗng → lỗi cạnh từng ô, Tab tới được thông báo; sai mật khẩu → câu
  báo 401, e-mail vẫn còn; nút bị khóa khi đang gửi (thử với MOCK_MODE=slow).
- MOCK_MODE=error: đăng nhập vẫn được; mở lại app có token → màn lỗi + Thử lại; đổi mock về
  normal, bấm Thử lại → vào được mà không reload trang.
- Log mock chỉ có POST /api/auth/login và GET /api/auth/me, không có request lặp.
- 360 / 768 / 1280 px: không cuộn ngang, nút cao ≥ 44px ở 360px.
- `git diff -- docs/api mock` trống.
```
