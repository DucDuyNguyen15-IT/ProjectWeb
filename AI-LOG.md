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

## 2. Lên ý tưởng bố cục 3 màn — 04/11/2026
- Người làm: Nguyễn Đức Duy
- Tool: Claude Code (Claude Opus 5.5), skill superpowers:brainstorming
- Request: Prompt 2 trong brief.md: hỏi từng câu kèm sơ đồ ASCII để chốt bố cục mỗi màn
  ở 360/768/1280, phần không làm được khi tắt JS, link luồng chính, mục dài, Not wired yet.
- Kết quả: docs/design/LAYOUT.md (commit c715067). 11 câu hỏi, mình chọn phương án đề xuất
  ở 10 câu; ở câu "các mục dưới hero Màn 1" mình chọn làm đầy đủ như Figma (gói chụp,
  ảnh mẫu, quy trình, đánh giá) thay vì phương án gọn assistant đề xuất.
- Changed: mình yêu cầu đổi tên "Linh" trên trang khách thành lời chung ("Tài khoản của
  tôi", "Bạn"); assistant cảnh báo đổi cả trang Admin sẽ mất tính thực tế của dữ liệu,
  nên chỉ đổi Màn 1 và Màn 3, Màn 2 giữ "Nguyễn Thùy Linh".
- Rejected: menu gập <details> cho header ở 360px (link bị ẩn khi tắt JS, script chấm có
  thể coi là thiếu nội dung); thanh demo nổi như PA#1 (che nội dung ở 360px); nút
  thanh toán disabled (thứ quan trọng nhất bị mờ, dễ trượt tương phản).
- Đã kiểm tra: đối chiếu từng màn với docs/pa1/ và LINK.md; mỗi khác biệt có lý do trong
  bảng Changed since PA#1; bảng rủi ro rubric ở cuối LAYOUT.md.

## 4. Mockup 3 màn × 3 độ rộng trên Claude Design — 09/11/2026
- Người làm: Nguyễn Thành Dự
- Tool: Claude Code (Claude Opus 5.5), MCP claude-artifacts (loại "Design")
- Request: Prompt 4 trong brief.md: vẽ 3 màn theo docs/design/LAYOUT.md ở 360/768/1280.
- Kết quả: canvas "GradStudio PA#2 — 3 màn × 3 độ rộng"
  (https://claude.ai/artifact/5kE3fGVb7B4NtfYn4AG1GK), 9 artboard, dùng design system
  GradStudio của Duy; nút Gửi → Màn 2, Tạo booking → Màn 3 bấm thử được.
- Changed: header Admin ở 768px tách 2 hàng (LAYOUT.md ghi 1 hàng; logo + 5 mục menu +
  tài khoản cần khoảng 760px, chỉ có 704px); danh sách khách thành 6 người ("Tất cả 6")
  vì thêm "Tôn Nữ Hoàng Phương Thảo Nguyên"; bảng lịch tài nguyên ở 1280 vẫn cuộn ngang
  trong khung riêng vì cột phải hẹp.
- Rejected: không có.
- Chưa xong / cần kiểm tra: ảnh là khối màu có nhãn (repo chưa có ảnh); giá gói Kỷ yếu
  và Chân dung CV để [GIÁ GÓI]; chữ phần Quy trình và Đánh giá do assistant viết, cần đối
  chiếu Figma PA#1. Assistant không tự mở canvas để kiểm tra; chiều cao artboard là ước lượng.

## 5. Chuyển stack sang React + Vite + Tailwind v4 — 09/11/2026
- Người làm: Nguyễn Thành Dự
- Tool: Claude Code (Claude Opus 5.5)
- Request: Prompt 5 trong brief.md: dựng React + Vite + Tailwind trong src/, sửa CLAUDE.md.
- Kết quả: commit "rules: allow React + Vite in CLAUDE.md" và "build: switch to React +
  Vite + Tailwind v4". HashRouter với 3 đường dẫn /#/, /#/hoi-thoai, /#/lich-chup (khung
  tạm); src/input.css đổi tên thành src/index.css, giữ nguyên token; gỡ @tailwindcss/cli
  và css/tailwind.css; dist/ vào .gitignore.
- Changed: assistant dừng lại hỏi trước khi cài vì CLAUDE.md cũ cấm React; mình xác nhận
  rubric PA#2 cho phép React và yêu cầu sửa CLAUDE.md. Chọn HashRouter thay vì
  BrowserRouter vì rubric mở thẳng từng đường dẫn trên static server.
- Rejected: `npm create vite` (mình hỏi vì sao không dùng). Lý do: repo đã có file nên
  lệnh sẽ hỏi ghi đè hoặc tạo thư mục con; template thêm ESLint + plugin (dependency ngoài
  danh sách), App.css, logo mẫu; không có sẵn Tailwind và router, vẫn phải cài tay.
- Đã kiểm tra: npm run build ra dist/ (CSS có class bg-brand đúng token); npx vite preview
  trả 200, dist/index.html nạp ./assets/… (đường dẫn tương đối). Chưa mở bằng trình duyệt.

## 6. Component React cho 3 màn từ mockup canvas — 09/11/2026
- Người làm: Nguyễn Thành Dự
- Tool: Claude Code (Claude Opus 5.5)
- Request: Prompt 6 trong brief.md: dựng lại 3 màn bằng component React theo canvas
  "GradStudio PA#2 — 3 màn × 3 độ rộng".
- Kết quả: commit 1230ab1 (component dùng chung), 2e200a3 (Màn 1), bcf35e2 (Màn 2),
  cb9cc51 (Màn 3). Dữ liệu mẫu theo câu chuyện của Linh trong src/data/.
- Assistant sai, script đo phát hiện: assistant viết script Playwright đo 3 màn × 3 độ rộng
  (scrollWidth > clientWidth, phần tử lòi qua mép phải, nút < 44px, số h1, landmark, lỗi console)
  và tìm ra lỗi trong chính code nó vừa viết:
  - Header Admin ở 360px rộng hơn trang khoảng 30px (logo + nhãn Studio + chuông + "Thảo · Quản lý
    studio"). Sửa: tên Thảo `sr-only md:not-sr-only`, hàng trên `flex-wrap` (layout.jsx).
  - Màn 2 ở 768/1280: bảng tài nguyên (`min-w-3xl`) và ô select đẩy cột lưới rộng ra quá màn.
    Sửa: `min-w-0` cho mọi con của lưới và hai cột bọc; chỉ wrapper của bảng `overflow-x-auto`.
  - Ở 1280, thẻ gợi ý giờ, thẻ khách và các dòng `<dl>` Màn 3 bị ép chữ thành cột hẹp.
    Sửa: gợi ý giờ và bản đồ xếp dọc, dòng `<dl>` đổi từ grid-cols-3 sang flex.
  - Component Icon bỏ qua prop className (mũi tên không xoay). Sửa trong Icons.jsx.
- Changed (mình yêu cầu): ở desktop lề hai bên quá rộng, giao diện bị ép vào giữa (max-w-6xl).
  Đổi sang token `--container-page` 1536px → commit 53aac2b.
- Rejected: mình yêu cầu bỏ form Booking mới khỏi Màn 2, cho chat to nhất và chuyển form sang
  menu Booking; assistant làm thành route /#/booking. Xem xong mình bảo "thôi để lại": đề có
  3 màn, form Booking mới nằm trong Màn 2 của PA#1, nên hoàn tác về 3 route. Không commit bản tách.
- Đã kiểm tra: script đo ở trên chạy lại sau mỗi lần sửa, 9/9 OK; script tương phản (mọi chữ
  ≥ 4.5:1), heading không nhảy cấp, mọi input có label, không trùng id.

## 7. Đối chiếu đề và bổ sung tương tác Màn 2, Màn 3 — 09/11/2026
- Người làm: Nguyễn Thành Dự
- Tool: Claude Code (Claude Opus 5.5)
- Request: Prompt 7 trong brief.md: hỏi đã đáp ứng đề chưa; đồng ý bổ sung phần thiếu.
- Assistant sai, đối chiếu với đề phát hiện: ở mục 6 assistant tự cho Màn 2 mở ở trạng thái
  "Linh đã chốt 14:00" và Màn 3 chỉ có nút mở thông tin chuyển khoản, rồi ghi trong PROTOTYPE.md
  là "khác biệt có lý do". Khi đọc lại docs/PROPOSAL.md (mô tả 3 màn) thì đây là tính năng đề
  giao cho màn, không phải tùy chọn: Chọn 14:00 → Mô phỏng phản hồi của Linh (Chốt giờ này /
  Từ chối) → Đã chốt lịch → Tạo booking mới bật; Màn 3 có hộp Mô phỏng thanh toán (Hủy /
  Thành công → Đã đặt lịch). Rubric mục 1: thiếu tính năng đề giao chỉ được 11–16 điểm.
- Kết quả: Màn 2 dùng hook useConsultation (clash → proposed → agreed/declined), Gửi báo giá
  và ô tin Admin thêm tin vào chat, Đặt lại demo (commit bcf35e2). Màn 3 dùng `<dialog>` gốc,
  số đếm tab tính theo trạng thái, chữ tab rỗng, Đặt lại demo (commit cb9cc51).
- Changed: không tự chuyển sang Màn 3 sau 2 giây như PA#1; "Tạo booking" thành `<Link>` sau
  khi Linh chốt (trước đó `disabled` kèm dòng giải thích). PROTOTYPE.md viết lại mục 3–5.
- Rejected: không có.
- Đã kiểm tra: script Playwright bấm đủ luồng ở 360px (chọn 15:00 → Từ chối → chọn 14:00 →
  Chốt → báo giá → gửi tin → Đặt lại → Tạo booking → Màn 3 → Hủy → Thành công → tab Chờ cọc
  rỗng → Đặt lại): mọi bước đúng, 0 lỗi console, không tràn ngang khi mở hộp thanh toán.

## 8. Ảnh chụp 9 màn và W3C checker — 09/11/2026
- Người làm: Nguyễn Thành Dự
- Tool: Claude Code (Claude Opus 5.5), Playwright (Chromium), validator.w3.org/nu
- Request: Prompt 8 trong brief.md: chụp 9 ảnh; gửi HTML đã render lên W3C checker.
- Kết quả: screenshots/ (commit 53aac2b), checks/validator-index.txt, -hoi-thoai.txt,
  -lich-chup.txt.
- Assistant sai, W3C checker phát hiện: lần chạy đầu 3 màn đều lỗi "Element title not allowed
  as child of element head": React 19 tự chèn `<title>` của component vào `<head>`, thành hai thẻ
  vì index.html đã có một. Màn 3 thêm lỗi "div is missing a required instance of child element
  dd/dt": đường kẻ là `<div>` rỗng nằm trong `<dl>`. Sửa: PageShell đặt `document.title` trong
  useEffect (commit 1230ab1); đường kẻ thành `border-t` của dòng "Còn lại 70%" (commit cb9cc51).
  Chạy lại: 0 lỗi, 0 cảnh báo cả 3 màn.
- Changed: ngoài trạng thái lúc mở, assistant gửi thêm 5 trạng thái sau khi bấm (Màn 2 chờ trả
  lời, đã chốt; Màn 3 hộp thanh toán mở, đã thanh toán, tab rỗng): đều 0 lỗi (không lưu file).
- Rejected: không có.
- Đã kiểm tra: HTML gửi là outerHTML của `<html>` sau khi render + `<!DOCTYPE html>` (không gửi
  dist/index.html). Ảnh chụp lại sau khi sửa W3C; mình mở xem hoi-thoai-1280.png.
  Chưa tự mở DevTools → Accessibility (script đã kiểm landmark, heading, label).

## 9. Hoàn thiện nộp bài — 09/11/2026
- Người làm: Nguyễn Thành Dự
- Tool: Claude Code (Claude Opus 5.5)
- Request: Prompt 9 trong brief.md: liệt kê việc còn lại; viết AI-LOG, chia commit,
  SELF_ASSESSMENT_REPORT.md theo mẫu, nén zip.
- Kết quả: code chia thành 5 commit (1230ab1 dùng chung, 2e200a3 Màn 1, bcf35e2 Màn 2,
  cb9cc51 Màn 3, 53aac2b responsive); assistant build lại từng commit bằng git archive, cả 5
  đều build được. Sửa hạn nộp trong docs/PHAN-CONG.md (8/11 → thứ Tư 11/11 theo rubric).
- Changed: phân công ghi Màn 1 và Màn 3 cho Duy, nhưng code trong repo của 3 màn được làm ở
  máy Dự (Dự + assistant), nên commit dưới tên Nguyễn Thành Dự cho đúng người làm.
  Commit "responsive" chỉ chứa token bề rộng trang và ảnh chụp: class responsive (mobile first,
  md:, xl:) được viết cùng lúc với từng màn nên nằm trong commit của màn đó.
- Rejected: không có.
- Đã kiểm tra: git log khớp file; npm run build sau thay đổi cuối cùng.
