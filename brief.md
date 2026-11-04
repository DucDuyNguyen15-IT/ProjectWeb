# brief.md — các prompt nhóm đã gửi cho assistant (nguyên văn, theo thứ tự)

## Prompt 1 — Nguyễn Đức Duy · Claude Code (Claude Opus 5.5) · 04/11/2026

Rules file, cài đặt dự án và quy trình cả milestone.

```
Bối cảnh: Nhóm mình gồm Nguyễn Đức Duy (24120294) và Nguyễn Thành Dự (24120184), môn CSC13008.
PA#2 (hạn 22:00 8/11/2026) yêu cầu chuyển 3 màn luồng chính PA#1 của dự án GradStudio thành 3 trang
HTML tĩnh responsive. GradStudio là thiết kế dùng chung cả lớp do thầy chốt, gốc ở repo
NhatVy177/gradstudio, bản fork ở DucDuyNguyen15-IT/gradstudio (gồm 3 ảnh màn trong prototype/,
2 ảnh bổ sung trong reference/, và LINK.md mô tả luồng bấm). Repo của nhóm:
https://github.com/DucDuyNguyen15-IT/ProjectWeb. Rubric: PA2-rubric-responsive-prototype.pdf
trong thư mục này. Đọc rubric và LINK.md trước khi làm.

3 trang theo thứ tự luồng chính:
  index.html      ← Màn 1: khách Linh xem dịch vụ và chat hỏi lịch 24/10 09:00
  hoi-thoai.html  ← Màn 2: Admin Thảo thấy trùng lịch makeup, đề xuất 14:00, Linh chốt, tạo booking
  lich-chup.html  ← Màn 3: Linh xem booking GS-1024, chờ cọc 30%

Quy trình (làm từng bước, xong bước nào chờ mình duyệt mới sang bước tiếp theo):
  1. Rules file và cài đặt dự án (lần này).
  2. Cùng mình lên ý tưởng bố cục từng màn ở 360/768/1280px, giữ đúng nội dung và phong cách PA#1.
  3. Tạo Design System (token màu, chữ, spacing, nút), dùng skill ui-ux-pro-max kiểm tra
     tương phản và chỉnh màu nhưng giữ tông kem/nâu của PA#1.
  4. Dựng mockup 3 màn × 3 độ rộng, xuất ảnh vào docs/design/.
  5. Code từng trang theo mockup, mỗi trang một commit; sau đó một commit riêng cho đợt responsive.
  Mọi khác biệt so với PA#1 phải được ghi lại kèm lý do để đưa vào PROTOTYPE.md.

Việc lần này:
1. git init thư mục D:\HK1-26-27\Web\PA2, nối remote tới repo trên, nhánh main.
2. Tạo CLAUDE.md ở gốc repo, ghi luật cho cả nhóm. Cho mình xem trước khi commit:
   - Stack: HTML5 + Tailwind CSS v4. CSS được build bằng Tailwind CLI từ src/input.css ra
     css/tailwind.css, và commit cả file đã build để trang mở được ngay mà không cần build.
     Trang chỉ nạp CSS qua <link rel="stylesheet" href="css/tailwind.css">. Không dùng Tailwind
     CDN (<script>), không dùng Bootstrap hay framework CSS thứ hai, không dùng framework JS,
     không thêm dependency ngoài @tailwindcss/cli. Không tải font từ ngoài; dùng system font
     stack (serif cho tiêu đề, sans-serif cho nội dung). Ảnh lưu trong assets/img/ và commit vào
     repo. Sau mỗi lần sửa HTML phải build lại và commit css/tailwind.css.
   - Token khai báo trong @theme của src/input.css: màu --color-*, font, cỡ chữ.
   - Spacing scale: chỉ dùng các bậc 1, 2, 3, 4, 6, 8, 12, 16 của Tailwind (4/8/12/16/24/32/48/64px).
     Không dùng arbitrary value như p-[13px], w-[350px].
   - Mobile first: class không tiền tố là cho 360px; md: (≥768px) và xl: (≥1280px). Không dùng
     breakpoint khác.
   - Chữ thân ≥ 16px (text-base). Chữ thân và chữ trên nút phải đạt tương phản ≥ 4.5:1.
   - Nút và link đứng riêng có min-h-11 (44px). Không tin chiều cao mặc định.
   - Semantic: mỗi trang có header, nav, main, footer; đúng một h1, không nhảy cấp heading.
     Hành động dùng <button>; chuyển trang dùng <a href="file.html"> hoặc nút submit của form có
     action="file.html". Mọi input có <label> hiển thị, gắn bằng for/id. Mọi img có alt.
     Có <meta name="viewport" content="width=device-width, initial-scale=1">.
   - Dữ liệu viết thẳng vào HTML theo câu chuyện của Linh trong LINK.md, không dùng lorem ipsum.
     Mỗi trang có ít nhất một mục dài (tên khách dài, tên gói dài) và mục đó phải xuống dòng.
   - Mục nằm ngoài 3 màn (Booking, Nhân sự, thanh toán, Xem đường đi…) hiển thị dạng chữ hoặc
     <button type="button" disabled>, và liệt kê trong PROTOTYPE.md mục "Not wired yet".
   - NEVER: !important (kể cả tiền tố ! của Tailwind); width/height cố định bằng px cho khối bố
     cục; overflow-x: hidden trên html/body/wrapper (chỉ wrapper của bảng được overflow-x-auto);
     onclick hoặc JS để chuyển trang; link tuyệt đối /x.html hoặc link tới thư mục; href="#"
     trên luồng chính; div làm nút; input chỉ có placeholder; lorem ipsum; sửa tay
     css/tailwind.css.
   - Định nghĩa "xong" cho một trang: tắt JavaScript rồi mở file trực tiếp ở 360/768/1280px;
     document.documentElement.scrollWidth > document.documentElement.clientWidth in ra false;
     [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right >
     document.documentElement.clientWidth) in ra []; clientWidth đúng bằng độ rộng đã đặt;
     W3C checker (validator.w3.org/nu, File upload) báo 0 lỗi; DevTools Accessibility pane
     hiện đúng landmark, heading và label; mọi link/form trên luồng chính mở đúng file.
   - Git: commit đầu tiên chỉ chứa CLAUDE.md; mỗi trang một commit; thêm một commit cho đợt
     responsive; message nói rõ thay đổi gì. Ai làm thì người đó commit trên máy mình.
3. Commit 2: chép 3 ảnh trong prototype/ và 2 ảnh trong reference/ từ repo
   DucDuyNguyen15-IT/gradstudio vào docs/pa1/, giữ nguyên tên file.
4. Commit 3: cài đặt Tailwind: package.json (devDependency @tailwindcss/cli, script "build" và
   "watch"), .gitignore có node_modules, src/input.css có @import "tailwindcss" và @theme tạm
   (token chính thức làm ở bước 3), build ra css/tailwind.css.
Chưa viết HTML và chưa push trong lần này. Báo lại cho mình danh sách commit sau khi xong.
```

## Prompt 2 — Nguyễn Đức Duy · Claude Code (Claude Opus 5.5) · 04/11/2026

Lên ý tưởng bố cục 3 màn ở 360/768/1280.

```
Bước 2: lên ý tưởng bố cục. Đọc CLAUDE.md, docs/pa1/ (5 ảnh) và LINK.md của repo
DucDuyNguyen15-IT/gradstudio. Chưa viết code, chưa tạo mockup trong bước này.

Mục tiêu: cùng mình chốt mỗi màn trông thế nào ở 360, 768 và 1280px, giữ đúng nội dung và
phong cách PA#1 (nền kem, nâu vàng, tiêu đề serif, câu chuyện của Linh ngày 24/10/2026).

Cách làm:
- Đi lần lượt Màn 1 → Màn 2 → Màn 3. Mỗi lần hỏi mình MỘT câu, kèm 2–3 phương án có sơ đồ
  ASCII ngắn và phương án bạn đề xuất. Chờ mình chọn rồi mới hỏi câu tiếp.
- Với mỗi màn, cần chốt được:
  · thứ tự các khối ở 360px (một cột), cách chia cột ở 768px và 1280px;
  · thứ quan trọng nhất của màn (nút hoặc khối nổi bật nhất);
  · phần nào của PA#1 không làm được khi tắt JavaScript (chat nổi, slideshow, nút "Màn 1/2/3",
    "Đặt lại demo", các bước bấm mô phỏng ở Màn 2, hộp thanh toán ở Màn 3) và thay bằng gì;
  · link hoặc form nào đưa sang trang tiếp theo trên luồng chính;
  · mục dài dùng để thử bố cục (tên khách dài, tên gói dài) đặt ở đâu;
  · phần nào là "Not wired yet".
- Báo ngay nếu một phương án có nguy cơ vi phạm rubric (cuộn ngang ở 360px, nút dưới 44px,
  bảng không co được, khác PA#1 mà không có lý do).

Kết quả: sau khi chốt cả 3 màn, viết docs/design/LAYOUT.md, gồm cho mỗi màn: bảng khối theo
3 độ rộng, thứ quan trọng nhất, link luồng chính, danh sách "Changed since PA#1" kèm lý do,
danh sách "Not wired yet". Cho mình xem trước khi commit. Commit
"design: layout decisions for 3 screens at 360/768/1280".
```
