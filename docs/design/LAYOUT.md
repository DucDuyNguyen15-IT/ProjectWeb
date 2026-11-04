# LAYOUT.md — bố cục 3 màn ở 360 / 768 / 1280 px

Kết quả bước 2 (Prompt 2 trong `brief.md`), chốt ngày 04/11/2026 giữa Nguyễn Đức Duy và assistant.
Nguồn: `docs/pa1/` (5 ảnh) và `LINK.md` của repo `DucDuyNguyen15-IT/gradstudio`. Luật kỹ thuật: `CLAUDE.md`.

Quy ước: "360" là class không tiền tố, "768" là `md:`, "1280" là `xl:`. Số trong cột 360 là thứ tự khối từ trên xuống.

---

## Phần dùng chung

### Header khách (Màn 1, Màn 3)

| | 360 | 768 | 1280 |
|---|---|---|---|
| Bố cục | 2 hàng: logo GradStudio + avatar "Tài khoản của tôi" / hai link "Dịch vụ" · "Lịch chụp của tôi" chia đôi, mỗi link cao ≥ 44px | 1 hàng: logo · 2 link · tài khoản | 1 hàng, nội dung có `max-w` |

- Link: "Dịch vụ" → `index.html`, "Lịch chụp của tôi" → `lich-chup.html`. Trang đang mở có `aria-current="page"` và gạch chân.
- Không dùng menu gập: mọi link luôn hiện.

### Header Admin (Màn 2)

| | 360 | 768 | 1280 |
|---|---|---|---|
| Bố cục | 2 hàng: logo + nhãn "Studio" + chuông + avatar Thảo (ẩn chữ "Quản lý studio") / menu 5 mục xếp lưới 3 cột, tự xuống dòng | 1 hàng như PA#1 | 1 hàng như PA#1 |

- "Hội thoại (3)" là link thật tới `hoi-thoai.html` (`aria-current="page"`). Booking, Lịch studio, Tài nguyên, Nhân sự hiển thị dạng chữ (chưa nối). Chuông là `<button type="button" disabled>`.
- Không cho menu cuộn ngang: script chấm sẽ báo phần tử vượt mép phải.

### Thanh demo "Màn 1 · Màn 2 · Màn 3" (cả 3 trang)

- `<nav aria-label="Chuyển màn demo">` gồm 3 link thật: `index.html`, `hoi-thoai.html`, `lich-chup.html`. Màn đang mở có `aria-current="page"`.
- Nằm ngay trên footer, **không nổi** (không `position: fixed`). Mỗi link cao ≥ 44px.

### Footer (cả 3 trang)

- Thông tin studio, ghi nguồn ảnh Unsplash. Link footer chưa nối thì hiển thị dạng chữ.

### Ghi chú kỹ thuật

- Màn 2 và Màn 3 đổi vị trí khối theo độ rộng bằng `grid-template-areas`. Thứ tự trong HTML theo thứ tự 360px, nên ở 1280px thứ tự Tab giữa các vùng không khớp vị trí trên màn hình. Rubric không chấm điểm này, nhưng nhóm cần giải thích được nếu bị hỏi.

---

## Màn 1 — `index.html` (khách xem dịch vụ và hỏi lịch)

| Khối | 360 | 768 | 1280 |
|---|---|---|---|
| Header khách | 1 | 1 hàng | 1 hàng |
| Hero: ảnh `<img>` có alt nằm sau chữ (`object-cover`) + lớp phủ nâu tối; dòng nhỏ "Studio ảnh tốt nghiệp & chân dung"; **h1** "Lưu lại ngày ra trường theo cách của bạn"; mô tả; nút "Xem gói chụp" (→ `#goi-chup`) và "Chat với studio" (→ `#tu-van`); 3 ý: Tư vấn trực tiếp trên web · Không lo trùng lịch · Chọn ảnh ngay trong tài khoản | 2, xếp chồng | Như 360, rộng hơn | Chữ bên trái, chat bên phải nằm trên ảnh |
| **Chat** (`#tu-van`, h2): "Đang hỏi về: Gói Tốt nghiệp"; tin của **Bạn** "Gói tốt nghiệp có makeup còn lịch 24/10 lúc 09:00 không?" (17:20); studio "Để mình kiểm tra lịch cho bạn nhé" (17:21); form có `<label>` "Tin nhắn của bạn" + nút **Gửi** | 3, nền kem dưới hero | 3, dưới hero | Trong hero, cột phải |
| Gói chụp (`#goi-chup`, h2): 3 thẻ Kỷ yếu lớp · Tốt nghiệp · Chân dung CV, mỗi thẻ có ảnh, giá tham khảo, nút "Tư vấn gói này" (→ `#tu-van`) | 4, 1 cột | 2 cột | 3 cột |
| Ảnh mẫu (h2): 6 ảnh (4 ảnh slideshow PA#1 + ảnh thẻ dịch vụ, nguồn trong `IMAGE_SOURCES.md`) | 5, 2 cột | 3 cột | 3 cột |
| Quy trình (h2): 4 bước Tư vấn → Chốt lịch & cọc 30% → Chụp → Chọn & nhận ảnh | 6, 1 cột | 2 cột | 4 cột |
| Đánh giá (h2): 3 thẻ đánh giá của khách trước | 7, 1 cột | 2 cột | 3 cột |
| Thanh demo + footer | 8 | Cuối | Cuối |

- **Thứ quan trọng nhất:** khung chat với câu hỏi lịch 24/10 09:00 và nút **Gửi**.
- **Luồng chính → Màn 2:** form chat có `action="hoi-thoai.html" method="get"`; thanh demo.
- **Mục dài:** tên gói "Gói Kỷ yếu lớp trọn ngày – 40 học sinh, 2 thợ chụp, makeup và trang phục đồng bộ" (phải xuống dòng ở 360).
- Nội dung chữ của Quy trình và Đánh giá lấy theo trang Figma của PA#1 khi dựng mockup.

**Changed since PA#1**

| Thay đổi | Lý do |
|---|---|
| Khung chat không nổi, không thu nhỏ được; ở 360/768 nằm dưới hero, ở 1280 nằm trong hero bên phải | Chat nổi và nút thu nhỏ cần JavaScript; khung nổi dễ che nội dung ở 360px |
| Slideshow hero chỉ còn 1 ảnh | Chuyển ảnh cần JavaScript |
| Thanh demo "Màn 1/2/3" không nổi, nằm trên footer | Khung nổi che nội dung ở 360px |
| "Tư vấn gói này" chỉ nhảy tới khung chat, không đổi ngữ cảnh gói đang hỏi | Đổi ngữ cảnh cần JavaScript |
| Bỏ hiệu ứng "đang gõ…" trong chat | Hiệu ứng động, trang tĩnh không cần |
| Header ở 360px tách thành 2 hàng | Một hàng không đủ chỗ cho logo, 2 link và tài khoản |
| Tên "Linh" trên trang khách đổi thành "Tài khoản của tôi" / "Bạn" | Trang dùng được cho mọi khách; trang Admin vẫn giữ tên khách thật |

**Not wired yet:** menu tài khoản; link ở footer; ảnh mẫu (chỉ hiển thị, không mở lớn).

---

## Màn 2 — `hoi-thoai.html` (Admin Thảo xử lý trùng lịch, tạo booking)

Trạng thái cố định: **Linh đã chốt 14:00, sẵn sàng tạo booking.**

| Khối | 360 | 768 | 1280 |
|---|---|---|---|
| Header Admin | 1 | 1 hàng | 1 hàng |
| **h1** "Hội thoại với khách" + thẻ khách: Nguyễn Thùy Linh · linh.nguyen@email.com · 0901 234 567 · "Đang hỏi về: Gói Tốt nghiệp" · "Đã chốt lịch" | 2 | Trên 2 cột | Đầu cột giữa |
| Chat với Linh (h2): yêu cầu 09:00 (17:20) → "Để mình kiểm tra lịch cho bạn nhé" (17:21) → studio đề xuất makeup 13:00–14:00, chụp 14:00–16:00 → Linh "Dạ em chốt lịch 14:00 ạ."; ô nhập tin có `<label>` | 3 | Cột trái | Cột giữa |
| Cảnh báo trùng lịch "Thợ makeup Mai đã có lịch 08:00–12:00. Không đủ nhân sự cho khung 09:00." + Gợi ý giờ trống (h2): 14:00 **Đã chọn** · 15:00 · 25/10 09:00 | 4 | Cột phải | Cột phải, dưới bảng |
| **Form Booking mới** (h2 "Chụp ảnh tốt nghiệp"), mọi ô có `<label>`: Khách hàng; Loại buổi chụp (select "Tốt nghiệp cá nhân"); Gói ("Gói Tốt nghiệp Premium · 2 giờ · 30 ảnh chỉnh"); Ngày 24/10/2026; Giờ bắt đầu chụp 14:00; Có makeup (checkbox); Giá 1.800.000đ; Phân công Mai makeup · Tuấn chụp · Phòng B; nút submit **Tạo booking** | 5 | Cột trái, dưới chat | Cột giữa, dưới chat |
| Lịch tài nguyên (h2 "Lịch tài nguyên – Thứ Bảy, 24/10"): `<table>` có `<caption>`, `<th scope>`; hàng Makeup Mai / Thợ chụp Tuấn / Thợ chụp Hà / Phòng A / Phòng B; cột khung 2 tiếng 08–18; ô trùng ghi chữ "Trùng"; chú giải Đã xác nhận / Yêu cầu đang xét / Trùng lịch / Nghỉ | 6, trong wrapper `overflow-x-auto` | Rộng hết, dưới 2 cột | Cột phải, trên cảnh báo |
| Danh sách khách (h2 "Khách đang chờ"): ô tìm có `<label>`; bộ lọc Tất cả 5 · Chưa trả lời 2 · Đang tư vấn 1; Nguyễn Thùy Linh (đang chọn), Trần Minh Khoa, Hồ Gia Bảo · Lớp 12A3, Lê Ngọc Hân, Phạm Hoàng Anh, **Tôn Nữ Hoàng Phương Thảo Nguyên** | 7 | Rộng hết | Cột trái |
| Thanh demo + footer | 8 | Cuối | Cuối |

- **Thứ quan trọng nhất:** nút **Tạo booking**, là nút đậm duy nhất trên trang.
- **Luồng chính → Màn 3:** form Booking mới có `action="lich-chup.html" method="get"`; thanh demo.
- **Mục dài:** khách "Tôn Nữ Hoàng Phương Thảo Nguyên" trong danh sách; tên gói trong select.

**Changed since PA#1**

| Thay đổi | Lý do |
|---|---|
| Chỉ hiển thị một trạng thái cố định: Linh đã chốt 14:00, form sẵn sàng | Chuyển trạng thái (Chọn 14:00 → Chốt giờ này → Tạo booking) cần JavaScript |
| Bỏ "Mô phỏng phản hồi của Linh", "Đặt lại demo" và tự chuyển sang Màn 3 sau 2 giây | Cần JavaScript; trang tĩnh dùng form submit để sang Màn 3 |
| Cột giữa không còn vùng cuộn riêng; cả trang cuộn | Vùng cuộn có chiều cao cố định cắt mất nội dung (lý do ảnh PA#1 Màn 2 bị cắt) |
| Lịch tài nguyên là bảng với cột khung 2 tiếng; ô trùng có chữ "Trùng" thay vì chỉ vạch chéo | Bảng co được bằng wrapper cuộn riêng; không chỉ dựa vào màu để truyền thông tin |
| Ở 360/768 thứ tự đổi: chat → trùng lịch → form → bảng → danh sách khách | Việc đang làm lên đầu, người dùng điện thoại không phải cuộn qua danh sách khách |
| Header Admin ở 360px tách 2 hàng, menu xếp lưới | Một hàng không đủ chỗ; menu cuộn ngang sẽ vượt mép phải |
| Thêm khách "Tôn Nữ Hoàng Phương Thảo Nguyên" | Mục dài để thử bố cục theo rubric |

**Not wired yet:** Booking, Lịch studio, Tài nguyên, Nhân sự; chuông thông báo; bộ lọc hội thoại; các hội thoại khác; nút "Chọn" 15:00 và 25/10; mũi tên đổi ngày của lịch; ô nhập và nút gửi tin trong chat Admin; "Gửi báo giá vào chat".

---

## Màn 3 — `lich-chup.html` (khách xem booking và cọc)

Trạng thái cố định: **Đã thống nhất lịch · Chờ cọc 30%.**

| Khối | 360 | 768 | 1280 |
|---|---|---|---|
| Header khách ("Lịch chụp của tôi" có `aria-current`) | 1 | 1 hàng | 1 hàng |
| **h1** "Lịch chụp của tôi" + "Xem lại lịch đã thống nhất với studio và thanh toán cọc để giữ lịch." + bộ lọc Tất cả 1 · Chờ cọc 1 · Đã đặt lịch 0 · Hoàn thành 0 | 2 | Rộng hết | Rộng hết |
| **Thẻ booking** GS-1024 · "Đã thống nhất lịch · Chờ cọc 30%" (h2 "Chụp ảnh tốt nghiệp"), `<dl>`: Gói Tốt nghiệp Premium; Bao gồm "Makeup tự nhiên với thợ Mai · 2 giờ chụp trong nhà và sân vườn · 30 ảnh chỉnh màu"; Ngày Thứ Bảy, 24/10/2026; Bắt đầu 13:00 (makeup); Giá gói 1.800.000đ; Cọc 30% 540.000đ; Còn lại 70% 1.260.000đ, thanh toán sau buổi chụp; **Thanh toán cọc 30% · 540.000đ** | 3 | Cột trái | Cột phải, trên |
| Lịch tuần (h2 "Tháng 10, 2026 · Tuần 43"): T2 19 → CN 25, T7 24 được đánh dấu; dòng thời gian "Thứ Bảy, 24/10 · Ngày của bạn" dạng `<ol>`: `<del>`09:00`</del>` "Giờ bạn yêu cầu ban đầu – thợ makeup đã kín lịch"; 13:00–14:00 Makeup với Mai "Có mặt sớm 10 phút để chuẩn bị"; 14:00–16:00 Chụp ảnh với Tuấn "Studio đề xuất · Trong nhà và sân vườn" | 4 | Rộng hết, dưới | Cột trái (rộng) |
| Bản đồ minh họa (ảnh có alt) + "GradStudio · TP. Hồ Chí Minh · Địa chỉ sẽ gửi khi đặt cọc" + "Xem đường đi" | 5 | Cột phải | Cột phải, dưới |
| Thanh demo + footer | 6 | Cuối | Cuối |

- **Thứ quan trọng nhất:** **Thanh toán cọc 30% · 540.000đ**, là `<details>`/`<summary>` nền nâu đậm (≥ 4.5:1, cao ≥ 44px). Mở ra (không cần JS): thông tin chuyển khoản mẫu + "Thanh toán trực tuyến sẽ có ở milestone sau".
- **Luồng chính:** Màn 3 là điểm cuối; "Dịch vụ" → `index.html`; thanh demo.
- **Mục dài:** dòng "Bao gồm" trong thẻ booking.
- Ảnh trong `screenshots/` chụp với `<details>` đang đóng (đúng như khi mở trang).

**Changed since PA#1**

| Thay đổi | Lý do |
|---|---|
| Hộp "Mô phỏng thanh toán" (Hủy / Thanh toán thành công) thay bằng `<details>` có thông tin chuyển khoản mẫu; không chuyển sang "Đã đặt lịch" | Hộp thoại và đổi trạng thái cần JavaScript |
| Bỏ "Đặt lại demo" | Cần JavaScript |
| Ở 360/768 thẻ booking đứng trước lịch tuần | Khách mở trên điện thoại thấy ngay tiền cọc và giờ đến |
| "Ngày của Linh" đổi thành "Ngày của bạn" | Trang khách dùng lời chung cho mọi khách |
| Thanh demo không nổi | Khung nổi che nội dung ở 360px |

**Not wired yet:** bộ lọc trạng thái booking; thanh toán trực tuyến; "Xem đường đi"; menu tài khoản.

---

## Kiểm tra rủi ro theo rubric

| Rủi ro | Cách tránh |
|---|---|
| Cuộn ngang ở 360px | Không width cố định; menu xuống dòng; chỉ bảng lịch được cuộn trong wrapper riêng |
| Nút dưới 44px | Mọi nút, link đứng riêng, `<summary>`, link menu và thanh demo có `min-h-11` |
| Bảng không co được | Wrapper `overflow-x-auto` chỉ quanh `<table>` của Màn 2 |
| Nội dung bị che | Không có khối `position: fixed` |
| Ẩn nội dung khi tắt JS | Không có menu gập; `<details>` duy nhất ở Màn 3 chứa nội dung phụ và mở được không cần JS |
| Chữ trắng trên ảnh thiếu tương phản | Lớp phủ đủ đậm; kiểm tra ở bước 3 bằng `ui-ux-pro-max` và DevTools |
| Khác PA#1 không giải thích | Mọi khác biệt nằm trong các bảng *Changed since PA#1* ở trên |
