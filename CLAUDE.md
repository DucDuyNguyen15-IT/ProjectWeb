# CLAUDE.md — luật dự án GradStudio (PA#2)

Nhóm: Nguyễn Đức Duy (24120294) · Nguyễn Thành Dự (24120184) — CSC13008.
Mọi assistant và mọi thành viên làm việc trong repo này đều tuân theo file này. Không tự sửa file này nếu chưa được nhóm đồng ý.

## Dự án

Một ứng dụng **React** responsive, dựng lại 3 màn luồng chính PA#1 của GradStudio (thiết kế dùng chung cả lớp, gốc `NhatVy177/gradstudio`). Ảnh PA#1 nằm trong `docs/pa1/`; câu chuyện mẫu và luồng bấm nằm trong `LINK.md` của repo gốc. Mockup đã duyệt: canvas "GradStudio PA#2 — 3 màn × 3 độ rộng" và `docs/design/`.

| Đường dẫn | Component | Màn PA#1 | Nội dung |
|---|---|---|---|
| `/#/` | `src/pages/DichVu.jsx` | Màn 1 | Khách Linh xem dịch vụ và chat hỏi lịch 24/10 09:00 |
| `/#/hoi-thoai` | `src/pages/HoiThoai.jsx` | Màn 2 | Admin Thảo thấy trùng lịch makeup, đề xuất 14:00, Linh chốt, tạo booking |
| `/#/lich-chup` | `src/pages/LichChup.jsx` | Màn 3 | Linh xem booking GS-1024, chờ cọc 30% |

Mọi khác biệt so với PA#1 phải được ghi lại kèm lý do, để đưa vào mục *Changed since PA#1* của `PROTOTYPE.md`.

## Stack

- **React** + **Vite** + **Tailwind CSS v4** (plugin `@tailwindcss/vite`). JavaScript (`.jsx`), không TypeScript.
- Định tuyến: **`react-router`** với **`HashRouter`** (`src/main.jsx`). Đường dẫn dạng `/#/hoi-thoai`, để mở thẳng được trên mọi static server.
- `vite.config.js` đặt `base: './'`.
- CSS nạp duy nhất qua `import './index.css'` trong `src/main.jsx`. `src/index.css` = `@import "tailwindcss"` + `@theme`.
- Font: system font stack (serif cho tiêu đề, sans-serif cho nội dung). Không tải font từ ngoài.
- Ảnh lưu trong `src/assets/img/` và `import` vào component để Vite đóng gói. Bản build chạy được khi không có mạng.
- **Dependency được phép (không thêm cái nào khác):**
  - `dependencies`: `react`, `react-dom`, `react-router`
  - `devDependencies`: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`

## Lệnh

```bash
npm install        # lần đầu sau khi clone
npm run dev        # làm việc, tự tải lại khi sửa
npm run build      # build ra dist/
npm run preview    # xem bản build (= npx vite preview), dùng để kiểm tra "xong"
```

Người chấm **không chạy npm**: trước khi nén zip phải `npm run build` sau thay đổi cuối cùng. `dist/` bị gitignore, nên phải zip thư mục làm việc, không zip bản clone.

## Cấu trúc thư mục

```
index.html           # vỏ Vite (lang="vi", viewport) — chỉ có <div id="root">
vite.config.js
src/main.jsx         # HashRouter + import './index.css'
src/App.jsx          # <Routes> của 3 màn
src/index.css        # nguồn Tailwind: @import "tailwindcss" + @theme
src/pages/           # DichVu.jsx, HoiThoai.jsx, LichChup.jsx — mỗi màn một file
src/components/      # phần dùng chung: header, footer, thanh demo, nút…
src/data/            # dữ liệu mẫu theo câu chuyện của Linh
src/assets/img/      # ảnh dùng trong trang
dist/                # bản build — không sửa tay, không commit
docs/pa1/            # ảnh 3 màn PA#1 đã nộp (+ 2 ảnh bổ sung Màn 2)
docs/design/         # bố cục, token, mockup đã duyệt
screenshots/         # index-*.png, hoi-thoai-*.png, lich-chup-*.png ở 360/768/1280 (full page, JS bật)
checks/              # validator-index / -hoi-thoai / -lich-chup (.png hoặc .txt)
```

## Design token và spacing

- Token khai báo trong `@theme` của `src/index.css`: màu `--color-*`, font, cỡ chữ.
- **Spacing scale:** chỉ dùng các bậc Tailwind **1, 2, 3, 4, 6, 8, 12, 16** (= 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px) cho padding, margin, gap.
- **Không dùng arbitrary value** như `p-[13px]`, `w-[350px]`, `text-[#abc]`. Không dùng `style={{…}}` để đặt spacing, màu hay kích thước.
- Chữ thân ≥ 16px (`text-base`). Chữ thân và chữ trên nút phải đạt tương phản **≥ 4.5:1**.
- Nút và link đứng riêng có **`min-h-11` (44px)**. Không tin chiều cao mặc định.

## Responsive — mobile first

- Class không tiền tố là cho **360px**.
- `md:` (≥ 768px) và `xl:` (≥ 1280px). **Không dùng breakpoint khác** (`sm:`, `lg:`, `2xl:`).
- Bố cục phải thay đổi theo độ rộng: một cột ở 360px, nhiều cột ở 1280px; không kéo giãn cột điện thoại ra màn laptop.
- Ảnh: `max-w-full h-auto`. Bảng rộng nằm trong wrapper `overflow-x-auto`.

## HTML semantic (trên trang đã render)

- `index.html` có `<meta name="viewport" content="width=device-width, initial-scale=1">` và `<html lang="vi">`.
- Mỗi màn render ra `<header>`, `<nav>`, `<main>`, `<footer>`.
- Mỗi màn đúng **một `<h1>`**, không nhảy cấp heading.
- Hành động dùng `<button type="button">`. **Chuyển màn dùng `<Link to="/hoi-thoai">`** của `react-router` (render ra `<a href>`), hoặc nút submit của `<form>`.
- Mọi input có `<label>` hiển thị, gắn bằng `htmlFor`/`id` (bấm vào chữ thì con trỏ vào ô).
- Mọi `<img>` có `alt`.
- **Mỗi màn tự hiển thị đủ nội dung khi mở thẳng đường dẫn**, không phụ thuộc state từ màn trước. Dữ liệu viết sẵn trong `src/data/` theo câu chuyện của Linh.
- Mỗi màn có ít nhất một mục dài (tên khách dài, tên gói dài) và mục đó phải xuống dòng.
- Mục nằm ngoài 3 màn (Booking, Nhân sự, thanh toán, Xem đường đi…) hiển thị dạng chữ hoặc `<button type="button" disabled>`, và được liệt kê trong `PROTOTYPE.md` mục *Not wired yet*.

## NEVER

- `!important`, kể cả tiền tố `!` của Tailwind (`!p-4`).
- Tailwind CDN dạng `<script>`; Bootstrap hay framework CSS thứ hai; framework JS khác ngoài React (Vue, Svelte, Next…); dependency ngoài danh sách ở mục Stack.
- Width/height cố định bằng px cho khối bố cục (dùng `max-w-*`, `%`, `fr`, `minmax`).
- `overflow-x: hidden` / `overflow-x-hidden` trên `html`, `body`, `#root` hay wrapper. Chỉ wrapper của bảng được `overflow-x-auto`.
- Chuyển màn bằng `onClick` + `useNavigate`, `window.location` hay `<button>` thường. Luồng chính chỉ dùng `<Link>` hoặc form submit.
- `<a href="x.html">` tự viết, link tới thư mục (`x/`) hay đường dẫn không có trong `App.jsx`.
- `href="#"` / `to="#"` trên luồng chính hoặc cho nút chưa nối.
- `<div>` hay `<span>` làm nút (`<div onClick>`).
- Input chỉ có placeholder, không có label.
- Lorem ipsum.
- Sửa tay hoặc commit `dist/`.
- Font, ảnh hay CSS tải từ CDN khi chạy trang.

## Định nghĩa "xong" cho một màn

1. `npm run build`, rồi `npm run preview`. **Tắt mạng**, mở thẳng đường dẫn của màn (`/#/hoi-thoai`…). JavaScript **bật**.
2. Ở **360 / 768 / 1280 px**:
   - `document.documentElement.scrollWidth > document.documentElement.clientWidth` → `false`
   - `[...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth)` → `[]` (phần tử trong wrapper cuộn của bảng thì được phép)
   - `document.documentElement.clientWidth` → đúng bằng độ rộng đã đặt
3. Ở 360px: nút và link đứng riêng cao ≥ 44px; mục dài xuống dòng.
4. W3C checker (validator.w3.org/nu, **Text input**): trong DevTools copy outerHTML của `<html>`, thêm `<!DOCTYPE html>` ở đầu, dán vào → **0 lỗi**. Không upload `dist/index.html` (chỉ là vỏ rỗng). Lưu kết quả vào `checks/`.
5. DevTools → Elements → **Accessibility**: landmark, heading và label đều đúng.
6. Mọi `<Link>` và form trên luồng chính mở đúng màn.

## Git

- Commit đầu tiên chỉ chứa `CLAUDE.md`.
- Mỗi màn một commit; thêm một commit riêng cho đợt responsive.
- Message nói rõ đã thay đổi gì. Không dùng message chỉ có "update".
- **Ai làm thì người đó commit trên máy mình** (`git config user.name` / `user.email` đặt theo tên thật).
- Không commit `node_modules/` và `dist/`.
