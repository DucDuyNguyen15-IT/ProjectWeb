# CLAUDE.md — luật dự án GradStudio (PA#3)

Nhóm: Nguyễn Đức Duy (24120294) · Nguyễn Thành Dự (24120184) — CSC13008.
Mọi assistant và mọi thành viên làm việc trong repo này đều tuân theo file này. Không tự sửa file này nếu chưa được nhóm đồng ý. Bản PA#2 của file vẫn còn trong lịch sử git.

## Dự án

App **React** chạy toàn bộ luồng chính GradStudio, bước **G1–G11**, cho 4 vai trò: khách hàng, admin, nhân viên, superadmin. Đề: rubric PA#3 và *GradStudio final project brief*. Phân công nằm trong `docs/PHAN-CONG.md`.

**Mọi dữ liệu đều lấy từ API.** API được viết thành contract trong `docs/api/` **trước**, sau đó `mock/server.mjs` trả lời đúng như contract, rồi mới đến front-end gọi nó. Ở PA#4, server Express thay chỗ mock trên cùng cổng 3001, front-end giữ nguyên.

Câu chuyện mẫu: Linh, Admin Thảo, makeup Mai (bận 08:00–12:00, nên 09:00 bị trùng), thợ chụp Tuấn, Phòng B, booking GS-1024, *Gói Tốt nghiệp Premium* (2 giờ, 30 ảnh), 1.800.000đ, cọc 540.000đ, còn lại 1.260.000đ. Đề xuất: makeup 13:00–14:00, chụp 14:00–16:00, thứ Bảy 24/10/2026.

**Tên trạng thái (dùng đúng chữ):**
- Hội thoại: Chưa trả lời · Đang tư vấn · Đã chốt lịch · Hoàn thành
- Booking: Chờ cọc 30% · Đã đặt lịch · Hoàn thành (Đã hủy khi admin hủy)

## Stack

- **React** + **Vite** + **Tailwind CSS v4** (plugin `@tailwindcss/vite`), trong `client/`. JavaScript (`.jsx`), không TypeScript.
- Định tuyến: **`react-router`** với **`HashRouter`**. Đường dẫn dạng `/#/lich-chup`.
- `client/vite.config.js`: `base: './'`; `server.proxy` và `preview.proxy` chuyển `/api` → `http://localhost:3001`.
- Form: React thuần (`useState`), không dùng thư viện form.
- Mock: `mock/server.mjs`, **chỉ dùng module có sẵn của Node** (`node:http`, `node:fs`, `node:url`…), không có `package.json` và không cần `npm install`.
- Font: system font stack. Ảnh lưu trong `client/src/assets/` hoặc do mock trả về bằng đường dẫn `/api/...`. Không tải gì từ CDN.
- **Dependency được phép (không thêm cái nào khác khi chưa hỏi nhóm):**
  - `dependencies`: `react`, `react-dom`, `react-router`
  - `devDependencies`: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`

## Lệnh

```bash
node mock/server.mjs                    # cổng 3001; PORT=… để đổi
MOCK_MODE=slow node mock/server.mjs     # normal | slow | error | empty
cd client && npm ci && npm run dev      # làm việc
cd client && npm run build && npx vite preview   # kiểm tra bản build
node tools/contract-check.mjs           # gửi mọi ví dụ trong docs/api/ tới mock vừa khởi động
```

Trên PowerShell: `$env:MOCK_MODE='slow'; node mock/server.mjs`.
Người chấm **không chạy npm**. Trước khi zip phải `npm run build` trong `client/` sau thay đổi cuối cùng.

## Cấu trúc thư mục

```
client/                  # app React (Vite)
  vite.config.js         # base './', proxy /api
  src/main.jsx           # HashRouter + AuthProvider + import './index.css'
  src/App.jsx            # <Routes>: mọi route, route bảo vệ theo vai trò, route 404
  src/api/               # hàm gọi API — nơi DUY NHẤT gọi fetch
  src/auth/              # AuthContext, useAuth, ProtectedRoute
  src/pages/             # mỗi màn một file
  src/components/        # phần dùng chung
  dist/                  # bản build — không sửa tay, không commit, có trong zip
mock/server.mjs          # mock API
mock/data/               # dữ liệu khởi đầu (JSON) theo câu chuyện của Linh
docs/api/                # CONTRACT: README.md + 01-auth.md … 10-admin.md
tools/contract-check.mjs # công cụ chấm tiêu chí 5 (của môn học)
docs/pa1/, docs/design/  # ảnh PA#1, token và bố cục
FRONTEND.md              # team, cách chạy, tài khoản demo, Routes, quyết định PO, thư viện, chưa làm
```

## Contract và mock — luật bắt buộc

- `docs/api/` là **nguồn sự thật**. Front-end chỉ gọi endpoint có trong contract, đúng method, path, field.
- **Thiếu endpoint hay thiếu field thì dừng lại và báo.** Không tự bịa endpoint, không tự thêm vào mock.
- **Assistant không sửa `docs/api/` và `mock/`** trừ khi được yêu cầu rõ. Mọi thay đổi sau khi front-end đã gọi endpoint phải có một dòng trong `## Changes` của file đó (ngày, thay đổi gì, vì sao).
- Thứ tự commit: contract → mock → front-end gọi nó.
- `README.md`: base `/api`, `Authorization: Bearer <token>`, một dạng lỗi chung, mã trạng thái, bảng mọi endpoint (method, path, vai trò, file).
- Mỗi endpoint ghi: vai trò được gọi, path/query, body (kiểu, bắt buộc, giới hạn), câu trả lời thành công, các lỗi 400 (thông báo theo từng field) / 401 / 403 / 404 / 409. Có ít nhất một ví dụ: khối request `http` rồi khối answer `http`, token viết `{{token:linh}}`.
- Checker gửi ví dụ của `README.md` trước, rồi các file theo bảng chữ cái, trên **một** mock vừa khởi động. Ví dụ phải chạy đúng theo thứ tự đó.
- Mock: 4 chế độ `MOCK_MODE` (normal ~150 ms, slow 2 s, error = 500 cho mọi request trừ đăng nhập, empty = mọi list là `[]`, kể cả list nằm trong object). Token `token-<user id>` vẫn dùng được sau khi restart. Mỗi request in một dòng `METHOD path status`. Thay đổi giữ trong bộ nhớ, restart thì về lại dữ liệu ban đầu.

## Front-end — luật bắt buộc

- **Chỉ gọi đường dẫn tương đối** `/api/...`. Không bao giờ ghi `http://localhost:3001`.
- **Không viết dữ liệu vào component.** Gói, hội thoại, booking, nhân viên, ảnh… trên màn luồng chính đều đến từ API. Không còn `src/data/`.
- **Mỗi màn có dữ liệu có đủ 3 trạng thái:** đang tải; lỗi kèm nút **Thử lại** (tải lại mà không reload trang); rỗng (có thông báo, không để vùng trắng). Mỗi thứ chỉ gửi một request, không gửi lặp.
- User và token nằm trong **một context**, đọc qua `useAuth()`. Đăng xuất là xóa cả hai. Mọi request sau khi đăng nhập có `Authorization: Bearer`.
- Route bảo vệ: chưa đăng nhập thì chuyển sang `/dang-nhap` và nhớ trang đang mở để quay lại sau khi đăng nhập. Vai trò khác mở vào thì bị chặn, có thông báo. Đường dẫn lạ thì hiện trang 404.
- **Mỗi route mở thẳng (sau khi đăng nhập) phải tự tải trạng thái hiện tại từ API**, không phụ thuộc state của màn trước. Route chỉ có sau một bước của luồng (vd. trang thanh toán thử, `after G7`) mà mở trước bước đó thì hiện thông báo, không để trang trắng.
- Sau một hành động (gửi tin, tạo booking…), màn hình cập nhật theo câu trả lời của API, không reload trang.
- **Form:** label hiển thị cho mọi input. Kiểm tra theo contract trước khi gửi. Sau lần gửi đầu, lỗi hiện **cạnh từng field**, gắn bằng `aria-describedby`. Lỗi 400 từ API hiện đúng field. Giữ nguyên chữ đã nhập khi lỗi. Nút submit bị khóa khi request đang chạy. Upload preview chặn sai loại hoặc quá dung lượng trước khi gửi, theo giới hạn trong contract.
- Thanh toán đi qua cổng thử của mock: API trả về một URL route trong app (ghi rõ đây là thanh toán thử), có nút thành công và nút thất bại, rồi quay lại trang kết quả. Giữ đúng luồng chuyển hướng như cổng thật, để PA#4 chỉ cần đổi đích.
- Nút bị khóa chỉ được dùng ở chỗ luồng tự khóa (*Tạo booking* trước khi khách đồng ý), và phải có lý do hiển thị trên màn hình.
- Đổi vai trò = đăng xuất rồi đăng nhập tài khoản khác. **Không có nút demo** kiểu Màn 1/2/3, Đặt lại demo, Mô phỏng…

## Design token và spacing (giữ từ PA#2)

- Token khai báo trong `@theme` của `client/src/index.css`.
- **Spacing scale:** chỉ dùng các bậc Tailwind **1, 2, 3, 4, 6, 8, 12, 16**.
- **Không dùng arbitrary value** (`p-[13px]`, `text-[#abc]`). Không dùng `style={{…}}` để đặt spacing, màu hay kích thước.
- Chữ thân ≥ 16px, tương phản **≥ 4.5:1**. Nút và link đứng riêng có **`min-h-11`**.

## Responsive và semantic (giữ từ PA#2)

- Mobile first: không tiền tố = 360px, `md:` ≥ 768px, `xl:` ≥ 1280px. Không dùng breakpoint khác.
- Không cuộn ngang ở 360 / 768 / 1280. Không có gì bị cắt. Ảnh `max-w-full h-auto`. Bảng rộng nằm trong wrapper `overflow-x-auto`.
- Mỗi màn có `<header>`, `<nav>`, `<main>`, `<footer>`. Đúng một `<h1>`, không nhảy cấp heading.
- Hành động là `<button type="button">`. Chuyển màn là `<Link>` (`<a href>`) hoặc nút submit. Mọi `<img>` có `alt`.
- Không dùng ảnh người thật: dùng minh họa hoặc chữ cái đầu.
- Ô chat không được nổi đè lên nội dung ở 360px. Form và lịch tài nguyên không bị cắt chữ. Trùng lịch không được báo bằng màu đơn thuần mà phải có chữ.
- Màn giới thiệu quy trình không hứa "giữ lịch" trước khi đặt cọc thành công.

## NEVER

- Gọi endpoint không có trong `docs/api/`. Sửa `docs/api/` hay `mock/` khi không được yêu cầu.
- URL tuyệt đối tới API. `fetch` nằm rải rác trong component (chỉ được gọi qua `src/api/`).
- Dữ liệu luồng chính viết cứng trong JSX hay trong file `.js` của client.
- Đọc vai trò từ URL, query hay checkbox thay vì từ token/user do API trả về.
- Mock dùng package npm.
- `!important` hay tiền tố `!` của Tailwind. Framework CSS thứ hai. Framework JS khác (Next, Remix framework mode…). Dependency mới khi chưa hỏi.
- Width/height cố định bằng px cho khối bố cục. `overflow-x-hidden` trên `html`, `body`, `#root` hay wrapper.
- Chuyển màn bằng `onClick` + `useNavigate`, hay `window.location`. Ngoại lệ: chuyển hướng sau đăng nhập, khi bị chặn và khi tới cổng thanh toán thử.
- `href="#"`, `<div onClick>`, input chỉ có placeholder, Lorem ipsum.
- Sửa tay hay commit `client/dist/`. Commit `node_modules/` hay `classroom-file/`.

## Định nghĩa "xong" cho một bước

1. `node mock/server.mjs` (mock vừa khởi động) và `npm run build && npx vite preview` trong `client/`. Tắt mạng.
2. Đăng nhập bằng tài khoản demo của vai trò đó, đi hết bước bằng link và nút của app. Log mock chỉ có endpoint nằm trong contract, không có request lặp.
3. Mở thẳng từng route của bước (và reload). Màn hình tự tải đủ.
4. Restart mock ở `slow`, `error`, `empty`: thấy loading; thấy lỗi + **Thử lại** (về `normal` rồi bấm Thử lại thì tải được); thấy thông báo rỗng.
5. Ở 360 / 768 / 1280: `document.documentElement.scrollWidth > document.documentElement.clientWidth` → `false`. Ở 360px tap target ≥ 44px.
6. W3C (validator.w3.org/nu, Text input) trên outerHTML của `<html>` đã render → 0 lỗi. Lưu kết quả vào `checks/`.
7. `node tools/contract-check.mjs` trên mock vừa khởi động → không FAIL.
8. `git diff -- docs/api mock` không có thay đổi nào ngoài những gì đã yêu cầu.

## Git

- Contract → mock → front-end, mỗi phần commit trước phần dùng nó.
- Ít nhất một commit cho mỗi bước hoặc nhóm bước. **Commit trước mỗi lần giao việc cho assistant**, để mỗi thay đổi của nó là một diff riêng.
- Message nói rõ đã thay đổi gì. Không dùng message chỉ có "update".
- **Ai làm thì người đó commit trên máy mình** (`git config user.name` / `user.email` theo tên thật). `git pull --rebase` trước khi push.
- Không thêm dòng attribution của AI vào commit.

## AI-LOG và brief

- `brief.md` = prompt **nguyên văn** đã gửi assistant cho PA#3, theo thứ tự.
- `AI-LOG.md`: mỗi việc giao assistant một mục dưới `## PA#3` (tool, yêu cầu, Changed, Rejected, check nào phát hiện lỗi). Assistant **không tự ghi** AI-LOG: soạn nội dung, đưa người dùng duyệt, được đồng ý mới ghi.
