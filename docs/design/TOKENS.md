# TOKENS.md — design token GradStudio

Kết quả bước 3 (Prompt 3 trong `brief.md`), ngày 04/11/2026.
- **Code:** `src/input.css` (`@theme` của Tailwind CSS v4). Đây là nguồn chính thức; artifact chỉ để xem.
- **Artifact Design System** (xem trước màu, chữ, nút, nhãn): https://claude.ai/artifact/PJtrtw715d1WC7UWRGEkCL. Artifact đang ở chế độ riêng tư; Duy cần bấm Share để Dự xem được.
- **Cách lấy màu:** đọc trực tiếp điểm ảnh từ 5 ảnh trong `docs/pa1/` (nền = màu chiếm nhiều nhất trong vùng, chữ = màu khác nền nhiều nhất).
- **Cách kiểm tra:** công thức tương phản WCAG 2.x (độ sáng tương đối), theo quy tắc của skill `ui-ux-pro-max` (chữ thường ≥ 4.5:1, không truyền thông tin chỉ bằng màu). Kiểm tra lại bằng DevTools colour picker khi đã có trang.

## Màu

| Token (Tailwind) | Mã | Dùng cho |
|---|---|---|
| `cream` (`bg-cream`) | `#faf6f0` | Nền trang |
| `paper` | `#fffdf9` | Nền thẻ |
| `sand` | `#f1e8dc` | Khung chat, hội thoại đang chọn, bong bóng tin của khách |
| `sand-soft` | `#f8f2ea` | Khung giá, panel form, nền ô nhập |
| `ink` | `#2b2118` | Chữ chính, tiêu đề, ô ngày đang chọn, lớp phủ hero `bg-ink/80` |
| `ink-soft` | `#463c33` | Chữ trong bong bóng chat |
| `ink-2` | `#4a4138` | Nền nhãn "Chưa trả lời" |
| `muted` | `#6f675d` | **Mọi** chữ phụ, kể cả placeholder |
| `brand` | `#8a5e25` | Nút chính, link, giá, chữ nhấn trên nền sáng, viền focus |
| `on-brand` | `#ffffff` | Chữ trên nền `brand` |
| `brand-soft` | `#f3e6d3` | Nền nhãn "Chờ cọc", chip "Đang hỏi về…" |
| `gold` | `#c9a46a` | **Chỉ trang trí** (chấm dòng thời gian, gạch chân nav) |
| `gold-light` | `#e0c48f` | Eyebrow trên hero tối |
| `line` | `#e6dccd` | Viền thẻ, đường kẻ (trang trí) |
| `line-strong` | `#928472` | Viền ô nhập, nút viền (≥ 3:1 với nền) |
| `success` / `success-soft` | `#55704b` / `#e7ede0` | Nhãn "Đã xác nhận" |
| `danger` / `danger-soft` | `#a8432f` / `#f5e4dd` | Cảnh báo trùng lịch, ô "Trùng" |
| `done` | `#805c69` | Nhãn "Hoàn thành" (trên `sand`) |

## Tương phản (chữ / nền)

Hero: lớp phủ `ink` 80% (`bg-ink/80`). Tỉ lệ tính ở trường hợp xấu nhất là điểm ảnh trắng dưới lớp phủ (ra `#554d46`).

| Cặp chữ / nền | PA#1 | Tỉ lệ cũ | Token mới | Tỉ lệ mới | Kết quả | Lý do |
|---|---|---|---|---|---|---|
| Chữ chính trên nền trang | `#2b2118` / `#faf6f0` | 14.63:1 | `#2b2118` / `#faf6f0` | 14.63:1 | Đạt |  |
| Chữ chính trên nền thẻ | `#2b2118` / `#fffdf9` | 15.50:1 | `#2b2118` / `#fffdf9` | 15.50:1 | Đạt |  |
| Chữ chính trên nền cát (chat, khách đang chọn) | `#2b2118` / `#f1e8dc` | 12.99:1 | `#2b2118` / `#f1e8dc` | 12.99:1 | Đạt |  |
| Chữ bong bóng chat trên nền cát | `#463c33` / `#f1e8dc` | 8.86:1 | `#463c33` / `#f1e8dc` | 8.86:1 | Đạt |  |
| Chữ phụ: mô tả dưới h1 | `#787069` / `#faf6f0` | 4.51:1 | `#6f675d` / `#faf6f0` | 5.17:1 | Đạt | Gộp 8 sắc xám PA#1 thành 1 token muted |
| Chữ phụ: preview hội thoại trên cát | `#7a7166` / `#f1e8dc` | 3.95:1 | `#6f675d` / `#f1e8dc` | 4.59:1 | Đạt | Không đạt → tối hơn |
| Chữ phụ: meta dòng thời gian trên thẻ | `#8e8881` / `#fffdf9` | 3.45:1 | `#6f675d` / `#fffdf9` | 5.48:1 | Đạt | Không đạt → muted |
| Chữ phụ: nhãn dl (Gói, Ngày…) trên thẻ | `#958f88` / `#fffdf9` | 3.15:1 | `#6f675d` / `#fffdf9` | 5.48:1 | Đạt | Không đạt → muted |
| Chữ phụ: tab, nav chưa chọn | `#8c847d` / `#faf6f0` | 3.41:1 | `#6f675d` / `#faf6f0` | 5.17:1 | Đạt | Không đạt → muted |
| Chữ phụ: giờ, nhãn trong khung giá | `#8b827a` / `#f8f2ea` | 3.39:1 | `#6f675d` / `#f8f2ea` | 5.00:1 | Đạt | Không đạt → muted |
| Ghi chú dưới 09:00 bị gạch | `#afaaa4` / `#fffdf9` | 2.27:1 | `#6f675d` / `#fffdf9` | 5.48:1 | Đạt | Không đạt → muted (vẫn gạch ngang) |
| Placeholder ô nhập | `#aba7a1` / `#fdfbf9` | 2.32:1 | `#6f675d` / `#fdfbf9` | 5.39:1 | Đạt | Không đạt → muted; ô vẫn có label riêng |
| Chữ trắng trên nút nâu | `#ffffff` / `#8e6126` | 5.40:1 | `#ffffff` / `#8a5e25` | 5.66:1 | Đạt | Nâu đổi nhẹ theo dòng dưới |
| Nâu (link, giá 540.000đ) trên thẻ | `#8e6126` / `#fffdf9` | 5.32:1 | `#8a5e25` / `#fffdf9` | 5.57:1 | Đạt |  |
| Nâu trên nhãn trạng thái "Chờ cọc" | `#8e6126` / `#f3e6d3` | 4.39:1 | `#8a5e25` / `#f3e6d3` | 4.60:1 | Đạt | 4.39 không đạt → #8a5e25 |
| Nâu trên chip "Đang hỏi về…" (nền cát) | `#8e6126` / `#f1e8dc` | 4.45:1 | `#8a5e25` / `#f1e8dc` | 4.67:1 | Đạt | 4.45 không đạt → #8a5e25 |
| Vàng: giờ 13:00, mã GS-1024, eyebrow trên nền sáng | `#c9a46a` / `#fffdf9` | 2.30:1 | `#8a5e25` / `#fffdf9` | 5.57:1 | Đạt | 2.30 không đạt → chữ trên nền sáng dùng brand; vàng chỉ để trang trí |
| Eyebrow vàng trên hero (lớp phủ 80%, điểm ảnh trắng nhất) | `#c9a46a` / `#554d46` | 3.55:1 | `#e0c48f` / `#554d46` | 4.91:1 | Đạt | 3.55 ở chỗ ảnh sáng nhất → vàng nhạt #e0c48f |
| Chữ trắng hero (lớp phủ 80%, điểm ảnh trắng nhất) | `#fbfaf9` / `#554d46` | 7.94:1 | `#ffffff` / `#554d46` | 8.28:1 | Đạt | Lớp phủ ink 80% cố định để đảm bảo mọi chỗ |
| Mô tả hero (lớp phủ 80%, điểm ảnh trắng nhất) | `#d6d5d3` / `#554d46` | 5.65:1 | `#d6d5d3` / `#554d46` | 5.65:1 | Đạt |  |
| Nhãn "Đã xác nhận" | `#55704b` / `#e7ede0` | 4.62:1 | `#55704b` / `#e7ede0` | 4.62:1 | Đạt |  |
| Cảnh báo trùng lịch | `#a8432f` / `#f5e4dd` | 4.85:1 | `#a8432f` / `#f5e4dd` | 4.85:1 | Đạt |  |
| Nhãn "Chưa trả lời" (kem trên nâu đậm) | `#faf6f0` / `#4a4138` | 9.27:1 | `#faf6f0` / `#4a4138` | 9.27:1 | Đạt |  |
| Nhãn "Hoàn thành" | `#805c69` / `#f1e8dc` | 4.74:1 | `#805c69` / `#f1e8dc` | 4.74:1 | Đạt |  |
| Ngày đang chọn T7 24 | `#faf6f0` / `#2b2118` | 14.63:1 | `#faf6f0` / `#2b2118` | 14.63:1 | Đạt |  |
| Chữ phụ trên nhãn nâu nhạt | — | — | `#6f675d` / `#f3e6d3` | 4.52:1 | Đạt | Kiểm tra thêm — đạt |
| Chữ phụ trên nền cảnh báo | — | — | `#6f675d` / `#f5e4dd` | 4.51:1 | Đạt | Kiểm tra thêm — đạt |

Ngoài chữ: viền ô nhập `line-strong` đạt 3.00–3.59:1 trên các nền sáng (WCAG yêu cầu 3:1 cho viền điều khiển); viền nút `brand` trên `cream` 5.26:1; viền focus `brand` trên `paper` 5.57:1.

## Changed since PA#1 (màu)

| Thay đổi | Lý do |
|---|---|
| 8 sắc xám/nâu nhạt của chữ phụ (`#787069`, `#7a7166`, `#8e8881`, `#958f88`, `#8c847d`, `#8b827a`, `#afaaa4`, `#aba7a1`) gộp thành một token `muted` `#6f675d` | 7/8 sắc không đạt 4.5:1 (2.27–3.95:1); một token giúp chữ phụ đồng nhất |
| Nâu chính `#8e6126` → `#8a5e25` | Trên nhãn "Chờ cọc" (4.39:1) và chip trên nền cát (4.45:1) chưa đạt; mắt thường gần như không thấy khác |
| Chữ vàng `#c9a46a` trên nền sáng (giờ 13:00, mã GS-1024, eyebrow "THỨ BẢY…") → dùng `brand` | Chỉ đạt 2.30:1; vàng giữ lại để trang trí |
| Eyebrow vàng trên hero → `gold-light` `#e0c48f`, lớp phủ cố định `ink` 80% | Ở chỗ ảnh sáng, vàng cũ chỉ đạt 3.55:1 |
| Placeholder `#aba7a1` → `muted` | 2.32:1; ô nhập vẫn có `<label>` riêng |

## Chữ

| Vai trò | 360px | 1280px | Font |
|---|---|---|---|
| h1 hero (Màn 1) | `text-4xl` 36px | `md:text-5xl` 48px, `xl:text-7xl` 72px | serif |
| h1 trang (Màn 2, 3) | `text-3xl` 30px | `xl:text-5xl` 48px | serif |
| h2 | `text-2xl` 24px | `xl:text-3xl` 30px | serif |
| h3 | `text-lg` 18px | `xl:text-xl` 20px | serif |
| Chữ thân | `text-base` 16px / 24px | như 360 | sans |
| Meta, giờ, eyebrow | `text-sm` 14px (chỉ cho các vai trò này) | như 360 | sans |

Font: `font-serif` = Georgia, "Noto Serif", "Times New Roman", serif · `font-sans` = system-ui … Arial, sans-serif. Không tải font ngoài.

## Spacing, bo góc, đổ bóng

- **Spacing:** chỉ dùng các bậc Tailwind `1 2 3 4 6 8 12 16` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px. Lề trang `px-4` → `md:px-8`; padding thẻ `p-4` → `md:p-6`; khoảng cách giữa section `py-12` → `xl:py-16`.
- **Bo góc:** `rounded-full` cho nút, ô nhập, nhãn, chip · `rounded-2xl` (16px) cho thẻ, khung chat, cảnh báo · `rounded-lg` (8px) cho ô ngày và ô bảng.
- **Đổ bóng:** `shadow-card` cho thẻ booking, thẻ gói và khung chat trên hero.

## Công thức class

| Thành phần | Class Tailwind |
|---|---|
| Nút chính (một nút mỗi trang) | `inline-flex items-center justify-center min-h-11 px-6 rounded-full font-semibold bg-brand text-on-brand` |
| Nút viền | `inline-flex items-center justify-center min-h-11 px-6 rounded-full font-semibold border border-brand text-brand` |
| Nút viền trên hero | `… border border-on-brand text-on-brand` |
| Link đứng riêng | `inline-flex items-center min-h-11 text-brand underline underline-offset-4` |
| Ô nhập | `w-full min-h-11 px-4 rounded-full border border-line-strong bg-sand-soft text-ink` + `<label>` phía trên |
| Nhãn trạng thái | `inline-flex items-center px-3 py-1 rounded-full text-sm` + cặp màu ở bảng tương phản |
| Thẻ | `rounded-2xl bg-paper shadow-card p-4 md:p-6` |
