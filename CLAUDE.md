# CLAUDE.md — luật dự án GradStudio (PA#2)

Nhóm: Nguyễn Đức Duy (24120294) · Nguyễn Thành Dự (24120184) — CSC13008.
Mọi assistant và mọi thành viên làm việc trong repo này đều tuân theo file này. Không tự sửa file này nếu chưa được nhóm đồng ý.

## Dự án

Ba trang HTML tĩnh, responsive, dựng lại 3 màn luồng chính PA#1 của GradStudio (thiết kế dùng chung cả lớp, gốc `NhatVy177/gradstudio`). Ảnh PA#1 nằm trong `docs/pa1/`; câu chuyện mẫu và luồng bấm nằm trong `LINK.md` của repo gốc.

| Trang | Màn PA#1 | Nội dung |
|---|---|---|
| `index.html` | Màn 1 | Khách Linh xem dịch vụ và chat hỏi lịch 24/10 09:00 |
| `hoi-thoai.html` | Màn 2 | Admin Thảo thấy trùng lịch makeup, đề xuất 14:00, Linh chốt, tạo booking |
| `lich-chup.html` | Màn 3 | Linh xem booking GS-1024, chờ cọc 30% |

Mọi khác biệt so với PA#1 phải được ghi lại kèm lý do, để đưa vào mục *Changed since PA#1* của `PROTOTYPE.md`.

## Stack

- HTML5 + **Tailwind CSS v4**, build bằng Tailwind CLI: `src/input.css` → `css/tailwind.css`.
- `css/tailwind.css` đã build **được commit**, để trang mở được ngay từ thư mục mà không cần build.
- Trang chỉ nạp CSS qua `<link rel="stylesheet" href="css/tailwind.css">`.
- Font: system font stack (serif cho tiêu đề, sans-serif cho nội dung). Không tải font từ ngoài.
- Ảnh lưu trong `assets/img/` và commit vào repo. Trang mở được khi không có mạng.
- Dependency duy nhất: `@tailwindcss/cli` (devDependency).

## Lệnh

```bash
npm install        # lần đầu sau khi clone
npm run build      # build css/tailwind.css — chạy sau MỖI lần sửa HTML hoặc src/input.css
npm run watch      # build tự động khi đang làm
```

Sau mỗi lần sửa HTML phải build lại và commit `css/tailwind.css` cùng commit với HTML.

## Cấu trúc thư mục

```
index.html, hoi-thoai.html, lich-chup.html
src/input.css        # nguồn Tailwind: @import "tailwindcss" + @theme
css/tailwind.css     # file build — không sửa tay
assets/img/          # ảnh dùng trong trang
docs/pa1/            # ảnh 3 màn PA#1 đã nộp (+ 2 ảnh bổ sung Màn 2)
docs/design/         # ảnh mockup đã duyệt
screenshots/         # <page>-360.png, <page>-768.png, <page>-1280.png (tắt JS, full page)
checks/              # validator-<page>.png/.txt (W3C, File upload)
```

## Design token và spacing

- Token khai báo trong `@theme` của `src/input.css`: màu `--color-*`, font, cỡ chữ.
- **Spacing scale:** chỉ dùng các bậc Tailwind **1, 2, 3, 4, 6, 8, 12, 16** (= 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px) cho padding, margin, gap.
- **Không dùng arbitrary value** như `p-[13px]`, `w-[350px]`, `text-[#abc]`.
- Chữ thân ≥ 16px (`text-base`). Chữ thân và chữ trên nút phải đạt tương phản **≥ 4.5:1**.
- Nút và link đứng riêng có **`min-h-11` (44px)**. Không tin chiều cao mặc định.

## Responsive — mobile first

- Class không tiền tố là cho **360px**.
- `md:` (≥ 768px) và `xl:` (≥ 1280px). **Không dùng breakpoint khác** (`sm:`, `lg:`, `2xl:`).
- Bố cục phải thay đổi theo độ rộng: một cột ở 360px, nhiều cột ở 1280px; không kéo giãn cột điện thoại ra màn laptop.
- Ảnh: `max-w-full h-auto`. Bảng rộng nằm trong wrapper `overflow-x-auto`.

## HTML semantic

- Có `<meta name="viewport" content="width=device-width, initial-scale=1">` và `<html lang="vi">`.
- Mỗi trang có `<header>`, `<nav>`, `<main>`, `<footer>`.
- Đúng **một `<h1>`**, không nhảy cấp heading.
- Hành động dùng `<button>`. Chuyển trang dùng `<a href="file.html">` hoặc nút submit của form có `action="file.html"`.
- Mọi input có `<label>` hiển thị, gắn bằng `for`/`id` (bấm vào chữ thì con trỏ vào ô).
- Mọi `<img>` có `alt`.
- Link luôn tương đối tới file: `lich-chup.html`.
- Dữ liệu viết thẳng vào HTML theo câu chuyện của Linh. Mỗi trang có ít nhất một mục dài (tên khách dài, tên gói dài) và mục đó phải xuống dòng.
- Mục nằm ngoài 3 màn (Booking, Nhân sự, thanh toán, Xem đường đi…) hiển thị dạng chữ hoặc `<button type="button" disabled>`, và được liệt kê trong `PROTOTYPE.md` mục *Not wired yet*.

## NEVER

- `!important`, kể cả tiền tố `!` của Tailwind (`!p-4`).
- Tailwind CDN dạng `<script>`; Bootstrap hay framework CSS thứ hai; framework JS (React, Vue…); dependency mới ngoài `@tailwindcss/cli`.
- Width/height cố định bằng px cho khối bố cục (dùng `max-w-*`, `%`, `fr`, `minmax`).
- `overflow-x: hidden` / `overflow-x-hidden` trên `html`, `body` hay wrapper. Chỉ wrapper của bảng được `overflow-x-auto`.
- `onclick` hoặc JS để chuyển trang.
- Link tuyệt đối (`/x.html`) hoặc link tới thư mục (`x/`).
- `href="#"` trên luồng chính hoặc cho nút chưa nối.
- `<div>` hay `<span>` làm nút.
- Input chỉ có placeholder, không có label.
- Lorem ipsum.
- Sửa tay `css/tailwind.css`.
- Font hay ảnh tải từ CDN khi chạy trang.

## Định nghĩa "xong" cho một trang

1. Tắt JavaScript (DevTools → `Ctrl+Shift+P` → *Disable JavaScript*), mở file trực tiếp từ thư mục.
2. Ở **360 / 768 / 1280 px**:
   - `document.documentElement.scrollWidth > document.documentElement.clientWidth` → `false`
   - `[...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth)` → `[]` (phần tử trong wrapper cuộn của bảng thì được phép)
   - `document.documentElement.clientWidth` → đúng bằng độ rộng đã đặt
3. Ở 360px: nút và link đứng riêng cao ≥ 44px; mục dài xuống dòng.
4. W3C checker (validator.w3.org/nu, *File upload*): **0 lỗi**. Lưu kết quả vào `checks/`.
5. DevTools → Elements → **Accessibility**: landmark, heading và label đều đúng.
6. Mọi link và form trên luồng chính mở đúng file.

## Git

- Commit đầu tiên chỉ chứa `CLAUDE.md`.
- Mỗi trang một commit; thêm một commit riêng cho đợt responsive.
- Message nói rõ đã thay đổi gì. Không dùng message chỉ có "update".
- **Ai làm thì người đó commit trên máy mình** (`git config user.name` / `user.email` đặt theo tên thật).
- Không commit `node_modules/`.
