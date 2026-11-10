import { Link } from 'react-router'

// Thành phần giao diện nhỏ dùng chung cho cả 3 màn. Màu, cỡ chữ, spacing lấy từ @theme
// trong src/index.css; chỉ dùng các bậc spacing 1 2 3 4 6 8 12 16 (xem CLAUDE.md).

const BUTTON = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 text-center font-semibold'

const VARIANTS = {
  // Nút đặc màu brand: mỗi màn chỉ có một (Gửi / Tạo booking / Thanh toán cọc 30%).
  primary: 'border-brand bg-brand text-on-brand hover:bg-ink hover:border-ink',
  outline: 'border-brand text-brand hover:bg-brand-soft',
  // Nút viền trên nền tối của hero.
  light: 'border-paper text-paper hover:bg-paper/10',
  // Nút chưa nối (Not wired yet).
  off: 'cursor-not-allowed border-dashed border-line-strong text-muted',
}

function buttonClass(variant, full, className) {
  return [BUTTON, VARIANTS[variant], full ? 'w-full' : '', className].filter(Boolean).join(' ')
}

/** Chuyển màn trên luồng chính: react-router <Link> render ra <a href>. */
export function ButtonLink({ to, variant = 'primary', full = false, className = '', children }) {
  return (
    <Link to={to} className={buttonClass(variant, full, className)}>
      {children}
    </Link>
  )
}

/** Hành động trong trang (không chuyển màn). */
export function ActionButton({ variant = 'outline', full = false, className = '', children, ...rest }) {
  return (
    <button type="button" className={buttonClass(variant, full, className)} {...rest}>
      {children}
    </button>
  )
}

/** Nút nằm ngoài 3 màn, liệt kê trong PROTOTYPE.md mục Not wired yet. */
export function DisabledButton({ full = false, className = '', children, ...rest }) {
  return (
    <button type="button" disabled className={buttonClass('off', full, className)} {...rest}>
      {children}
    </button>
  )
}

const CHIP_TONES = {
  brand: 'bg-brand-soft text-brand',
  success: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
  dark: 'bg-ink-2 text-cream',
  done: 'bg-sand text-done',
  sand: 'bg-sand text-ink',
  plain: 'border border-line bg-paper text-ink',
}

/** Nhãn trạng thái: luôn có chữ, không truyền thông tin chỉ bằng màu. */
export function Chip({ tone = 'brand', dot = false, className = '', children }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${CHIP_TONES[tone]} ${className}`}>
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

const AVATAR_SIZES = { sm: 'size-8 text-sm', md: 'size-10 text-sm', lg: 'size-12 text-lg' }
const AVATAR_TONES = { sand: 'bg-sand text-ink', ink: 'bg-ink text-cream' }

/** Ảnh đại diện dạng chữ cái đầu (trang trí, ẩn với trình đọc màn hình). */
export function Avatar({ size = 'md', tone = 'sand', children }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-none items-center justify-center rounded-full font-serif ${AVATAR_SIZES[size]} ${AVATAR_TONES[tone]}`}
    >
      {children}
    </span>
  )
}

/** Dòng chữ nhỏ in hoa phía trên tiêu đề. */
export function Eyebrow({ tone = 'brand', className = '', children }) {
  const color = tone === 'light' ? 'text-gold-light' : 'text-brand'
  return <p className={`text-sm font-semibold uppercase tracking-widest ${color} ${className}`}>{children}</p>
}

/** Khung ảnh tạm cho tới khi có ảnh thật trong src/assets/img/. */
export function PhotoPlaceholder({ caption, ratio = 'aspect-4/3', tone = 'bg-sand' }) {
  return (
    <figure className={`flex w-full items-end p-3 ${ratio} ${tone}`}>
      <figcaption className="rounded-lg bg-paper px-2 py-1 text-sm text-muted">Ảnh minh họa: {caption}</figcaption>
    </figure>
  )
}

export const CARD = 'rounded-2xl bg-paper shadow-card'
export const CONTAINER = 'mx-auto w-full max-w-page px-4 md:px-8'
export const INPUT = 'min-h-11 w-full rounded-full border border-line-strong bg-paper px-4 text-ink'
