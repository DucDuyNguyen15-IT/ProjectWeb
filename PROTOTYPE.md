# PROTOTYPE.md — GradStudio PA#2 (responsive prototype)

## 1. Team

| Họ và tên | MSSV |
|---|---|
| Nguyễn Đức Duy | 24120294 |
| Nguyễn Thành Dự | 24120184 |

## 2. How to open

Bản này dựng bằng **React + Vite + Tailwind CSS v4**. Bản build nằm sẵn trong `dist/`.

```bash
npm ci
npx vite preview      # mở địa chỉ in ra, ví dụ http://localhost:4173/
```

- **Không cần mạng**: CSS được đóng gói vào bản build, font là font hệ thống, không tải gì từ CDN.
- Định tuyến dùng `HashRouter`, nên mỗi màn mở thẳng được bằng đường dẫn ở mục 3 (không cần bấm qua màn trước).
- Làm việc với mã nguồn: `npm install`, `npm run dev`; build lại bằng `npm run build`.

## 3. Screens

Luồng chính: khách hỏi lịch trong chat → Admin xử lý trùng lịch và tạo booking → khách xem lịch và cọc 30%.

| Đường dẫn | Màn GradStudio (PA#1) | Người dùng làm gì | Link trên màn mở tới |
|---|---|---|---|
| `/#/` | Màn 1 — Dịch vụ và chat | Khách xem gói chụp, ảnh mẫu, quy trình, đánh giá; hỏi trong chat "Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?". "Tư vấn gói này" đổi gói đang hỏi trong chat và đưa con trỏ vào ô tin nhắn. | **Gửi** → `/#/hoi-thoai` · Dịch vụ, logo → `/#/` · Lịch chụp của tôi → `/#/lich-chup` · thanh demo → 3 màn |
| `/#/hoi-thoai` | Màn 2 — Tư vấn và xử lý trùng lịch | Admin Thảo thấy cảnh báo thợ makeup Mai kín 08:00–12:00 (form đang ở 09:00, báo "Trùng"). Bấm **Chọn 14:00** (hoặc 15:00, 25/10) → lời đề xuất vào chat, form điền giờ mới, lịch tài nguyên hiện ô của Linh. Khối **Mô phỏng phản hồi của Linh**: **Chốt giờ này** → trạng thái "Đã chốt lịch", **Tạo booking** bật; **Từ chối** → chọn giờ khác. **Gửi báo giá vào chat** và ô tin nhắn Admin thêm tin vào chat. Lọc và tìm trong danh sách khách đang chờ. **Đặt lại demo** về lúc đầu. | **Tạo booking** (sau khi Linh chốt) → `/#/lich-chup` · Hội thoại, logo → `/#/hoi-thoai` · thanh demo → 3 màn |
| `/#/lich-chup` | Màn 3 — Lịch chụp và cọc | Linh xem booking GS-1024 (Chờ cọc 30%), giá 1.800.000đ, cọc 540.000đ, còn lại 1.260.000đ; xem lịch tuần và dòng thời gian ngày 24/10. **Thanh toán cọc 30%** mở hộp **Mô phỏng thanh toán**: **Hủy** → vẫn Chờ cọc; **Thanh toán thành công** → "Đã đặt lịch", cọc ghi "Đã thanh toán", hẹn 13:00 makeup, số đếm tab đổi (Chờ cọc 0, Đã đặt lịch 1). Lọc booking theo trạng thái (tab rỗng: "Chưa có lịch chụp nào ở mục này."). **Đặt lại demo** về Chờ cọc. | Dịch vụ, logo → `/#/` · Lịch chụp của tôi → `/#/lich-chup` · thanh demo → 3 màn |

Mục dài để thử bố cục: tên gói "Gói Kỷ yếu lớp trọn ngày – 40 học sinh, 2 thợ chụp, makeup và trang phục đồng bộ" (Màn 1), khách "Tôn Nữ Hoàng Phương Thảo Nguyên" (Màn 2), dòng "Bao gồm" của booking (Màn 3).

Mockup trước khi code: canvas "GradStudio PA#2 — 3 màn × 3 độ rộng" (Claude Design, 9 artboard), bố cục trong `docs/design/LAYOUT.md`, token trong `docs/design/TOKENS.md`.

## 4. Your design choices (Changed since PA#1)

### Chung cả 3 màn

| Thay đổi | Lý do |
|---|---|
| Thanh "Màn 1 · Màn 2 · Màn 3" không nổi, nằm ngay trên footer | Khung nổi che nội dung ở 360px |
| "Đặt lại demo" là nút cạnh tiêu đề Màn 2 và Màn 3, không nổi | Trạng thái demo nằm trong React state của từng màn; mở thẳng đường dẫn luôn bắt đầu ở bước đầu của màn đó, không phụ thuộc màn trước |
| Header ở 360px tách 2 hàng (Admin: cả 360 và 768), menu không gập | Một hàng không đủ chỗ; menu gập ẩn link khỏi người dùng điện thoại, menu cuộn ngang lòi ra mép phải |
| 8 sắc xám của chữ phụ gộp thành một màu `muted` `#6f675d`; nâu chính `#8e6126` → `#8a5e25`; chữ vàng trên nền sáng → nâu `brand` | 7/8 sắc xám và chữ vàng PA#1 không đạt 4.5:1 (bảng đầy đủ trong `docs/design/TOKENS.md`) |
| Nội dung rộng tối đa 1536px (`max-w-page`), lề 32px từ 768px | Ở 1280px nội dung dùng 1216px thay vì bị ép vào giữa; màn rộng hơn thì dừng lại để dòng không quá dài |

### Màn 1 — `/#/`

| Thay đổi | Lý do |
|---|---|
| Khung chat không nổi, không thu nhỏ; ở 1280 nằm bên phải hero, ở 360/768 nằm ngay dưới chữ hero | Chat là việc quan trọng nhất của màn, luôn hiện; khung nổi che nội dung ở 360px |
| Hero dùng nền nâu tối thay cho slideshow 4 ảnh; ảnh gói và ảnh mẫu tạm là khối màu có chú thích | Chưa có bộ ảnh được phép đưa vào repo; slideshow tự chuyển gây chuyển động liên tục |
| Bỏ hiệu ứng "đang gõ…" | Hiệu ứng động không mang thông tin |
| "Bạn" / "Tài khoản của tôi" thay cho tên "Linh" | Trang khách dùng lời chung cho mọi khách; trang Admin giữ tên thật |
| "Xem gói chụp", "Chat với studio" là nút cuộn trong trang | `href="#goi-chup"` sẽ bị HashRouter hiểu là một route khác |

### Màn 2 — `/#/hoi-thoai`

| Thay đổi | Lý do |
|---|---|
| Giữ "Chọn giờ → Mô phỏng phản hồi của Linh (Chốt giờ này / Từ chối)", nhưng bỏ việc tự chuyển sang Màn 3 sau 2 giây | Tự chuyển trang làm người dùng mất quyền điều khiển; sau khi Linh chốt, "Tạo booking" thành link thật sang Màn 3. Trước đó là nút `disabled` kèm dòng "Chờ khách chốt giờ để tạo booking." |
| Khi đang chờ Linh trả lời, các nút "Chọn giờ" bị khóa; sau khi Linh chốt, giờ đã chọn không đổi nữa (dùng "Đặt lại demo") | Tránh đề xuất hai giờ cùng lúc |
| Cột giữa không còn vùng cuộn riêng; cả trang cuộn | Vùng cuộn chiều cao cố định cắt mất nội dung (ảnh PA#1 Màn 2 bị cắt vì vậy) |
| Lịch tài nguyên là `<table>` cột 2 giờ trong khung cuộn ngang riêng; ô trùng ghi chữ "Trùng", ô khác ghi "Đã xác nhận / Đang xét / Nghỉ / Trống" | Bảng không co được ở 360px; không truyền thông tin chỉ bằng màu hay vạch chéo |
| Thứ tự ở 360/768: chat → gợi ý giờ → form → bảng → danh sách khách | Việc đang làm lên đầu, không phải cuộn qua danh sách khách |
| Thêm khách "Tôn Nữ Hoàng Phương Thảo Nguyên" ("Tất cả 6") | Mục dài để thử bố cục |

### Màn 3 — `/#/lich-chup`

| Thay đổi | Lý do |
|---|---|
| Hộp "Mô phỏng thanh toán" dùng `<dialog>` gốc của trình duyệt; ở 360px hai nút xếp dọc, nút chính ở trên | Giữ focus trong hộp, Esc để đóng, không cần thư viện; nút rộng hết hộp dễ bấm trên điện thoại |
| Ở 360/768 thẻ booking đứng trước lịch tuần | Khách mở trên điện thoại thấy ngay tiền cọc và giờ đến |
| "Ngày của Linh" → "Ngày của bạn" | Trang khách dùng lời chung |

## 5. Not wired yet

| Màn | Điều khiển | Hiển thị |
|---|---|---|
| Màn 1 | Menu "Tài khoản của tôi" | `<button disabled>` |
| Màn 1 | Gửi tin nhắn thật (nút **Gửi** chỉ chuyển sang Màn 2) | — |
| Màn 1 | Mở lớn ảnh mẫu; ảnh thật cho hero, gói chụp, ảnh mẫu | khối màu có chú thích |
| Màn 2 | Menu Booking, Lịch studio, Tài nguyên, Nhân sự | chữ |
| Màn 2 | Chuông thông báo | `<button disabled>` |
| Màn 2 | Mở các hội thoại khác trong danh sách | chữ |
| Màn 2 | Mũi tên đổi ngày của lịch tài nguyên | `<button disabled>` |
| Màn 2 | Gửi tin thật tới khách (tin Admin và báo giá chỉ thêm vào chat trên trang) | — |
| Màn 2 | Lưu form Booking mới (nút **Tạo booking** chỉ chuyển sang Màn 3; Màn 3 luôn hiện booking 24/10 14:00) | — |
| Màn 3 | Cổng thanh toán cọc thật | hộp "Mô phỏng thanh toán" |
| Màn 3 | "Xem đường đi"; bản đồ thật | `<button disabled>`; bản đồ minh họa |
| Màn 3 | Menu "Tài khoản của tôi" | `<button disabled>` |

## 6. CSS

- **Framework:** Tailwind CSS v4, build qua plugin `@tailwindcss/vite` vào bản build Vite. Không dùng framework CSS thứ hai, không `!important`, không arbitrary value (`p-[13px]`…).
- **Design token:** khai báo trong `@theme` của `src/index.css`: 20 màu (`cream`, `paper`, `ink`, `muted`, `brand`…), font serif/sans hệ thống, `shadow-card`, `--container-page` (1536px). Bảng tương phản: `docs/design/TOKENS.md`.
- **Spacing scale:** chỉ các bậc Tailwind 1, 2, 3, 4, 6, 8, 12, 16 = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px cho padding, margin, gap.
- **Breakpoints (mobile first):** không tiền tố = 360px · `md:` ≥ 768px · `xl:` ≥ 1280px. Không dùng `sm:`, `lg:`, `2xl:`.
- **Chữ:** thân 16px; 14px chỉ cho meta, giờ, nhãn. Nút và link đứng riêng cao tối thiểu 44px (`min-h-11`).
