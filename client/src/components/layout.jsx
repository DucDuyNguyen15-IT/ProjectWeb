import { useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import { Avatar, Chip, CONTAINER } from './ui.jsx'
import { Bell, ChevronDown } from './Icons.jsx'

// Header, thanh demo, footer và khung trang dùng chung.
// Không có menu gập: mọi link luôn hiện ở cả 3 độ rộng.

function Logo({ to, tone }) {
  return (
    <Link to={to} className={`inline-flex min-h-11 items-center font-serif text-2xl ${tone}`}>
      Grad<em>Studio</em>
    </Link>
  )
}

function navLinkClass(active, tone, idle) {
  return `inline-flex min-h-11 items-center gap-2 border-b-2 px-1 ${
    active ? `border-gold font-semibold ${tone}` : `border-transparent ${idle}`
  }`
}

const CUSTOMER_LINKS = [
  { to: '/', label: 'Dịch vụ', end: true },
  { to: '/lich-chup', label: 'Lịch chụp của tôi' },
]

/** Header trang khách (Màn 1, Màn 3). 360: 2 hàng; từ 768: 1 hàng. */
export function CustomerHeader({ dark = false }) {
  const tone = dark ? 'text-paper' : 'text-ink'
  const idle = dark ? 'text-sand' : 'text-muted'
  return (
    <header className={dark ? '' : 'border-b border-line bg-paper'}>
      <div className={`${CONTAINER} flex flex-col gap-1 py-2 md:flex-row md:items-center md:justify-between md:gap-6 md:py-3`}>
        <div className="flex items-center justify-between gap-3 md:contents">
          <Logo to="/" tone={tone} />
          <button type="button" disabled className={`inline-flex min-h-11 items-center gap-2 font-semibold md:order-last ${tone}`}>
            <Avatar size="sm">B</Avatar>
            Tài khoản của tôi
            <ChevronDown size="size-4" />
          </button>
        </div>
        <nav aria-label="Điều hướng chính">
          <ul className="grid grid-cols-2 gap-2 md:flex md:gap-8">
            {CUSTOMER_LINKS.map((l) => (
              <li key={l.to} className="flex justify-center">
                <NavLink to={l.to} end={l.end} className={({ isActive }) => navLinkClass(isActive, tone, idle)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

// Mục menu Admin chưa nối (Not wired yet): chỉ hiển thị chữ.
const ADMIN_TEXT_ITEMS = ['Booking', 'Lịch studio', 'Tài nguyên', 'Nhân sự']

/** Header Admin (Màn 2). 360 và 768: 2 hàng (menu ở dưới); 1280: 1 hàng. */
export function AdminHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex w-full max-w-page flex-col gap-1 px-4 py-2 md:px-8 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3 xl:contents">
          <div className="flex items-center gap-2">
            <Logo to="/hoi-thoai" tone="text-ink" />
            <Chip tone="sand">Studio</Chip>
          </div>
          <div className="flex items-center gap-3 xl:order-last">
            <button
              type="button"
              disabled
              aria-label="Thông báo"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink"
            >
              <Bell />
            </button>
            <p className="flex items-center gap-2">
              <Avatar tone="ink">T</Avatar>
              <span className="flex flex-col">
                {/* 360: chỉ hiện avatar, tên vẫn đọc được bằng trình đọc màn hình */}
                <strong className="sr-only md:not-sr-only">Thảo</strong>
                <span className="hidden text-sm text-muted md:block">Quản lý studio</span>
              </span>
            </p>
          </div>
        </div>
        <nav aria-label="Điều hướng quản lý">
          <ul className="grid grid-cols-3 gap-x-2 md:flex md:flex-wrap md:gap-6">
            <li className="flex justify-center">
              <NavLink to="/hoi-thoai" className={({ isActive }) => navLinkClass(isActive, 'text-ink', 'text-muted')}>
                Hội thoại
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand text-sm text-on-brand">
                  3<span className="sr-only"> hội thoại mới</span>
                </span>
              </NavLink>
            </li>
            {ADMIN_TEXT_ITEMS.map((t) => (
              <li key={t} className="flex min-h-11 items-center justify-center px-1 text-muted">{t}</li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

const DEMO_LINKS = [
  { to: '/', label: 'Màn 1 · Dịch vụ và chat', end: true },
  { to: '/hoi-thoai', label: 'Màn 2 · Hội thoại Admin' },
  { to: '/lich-chup', label: 'Màn 3 · Lịch chụp' },
]

/** Thanh chuyển màn demo: không nổi, nằm ngay trên footer. */
export function DemoNav() {
  return (
    <nav aria-label="Chuyển màn demo" className="border-t border-line py-8">
      <div className={`${CONTAINER} flex flex-col gap-3`}>
        <p className="text-sm text-muted">Demo luồng chính GradStudio</p>
        <ul className="flex flex-wrap gap-2">
          {DEMO_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center rounded-full border px-4 ${
                    isActive ? 'border-ink bg-ink text-cream' : 'border-line-strong text-ink hover:bg-sand'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-ink py-8 md:py-12">
      <div className={`${CONTAINER} grid gap-6 md:grid-cols-3 md:gap-8`}>
        <div className="flex flex-col gap-2">
          <p className="font-serif text-2xl text-cream">Grad<em>Studio</em></p>
          <p className="text-sand">Studio ảnh tốt nghiệp và chân dung tại TP. Hồ Chí Minh.</p>
        </div>
        <div className="flex flex-col gap-2 text-sand">
          <p className="font-semibold text-cream">Liên hệ</p>
          <p>Hotline 0909 123 456</p>
          <p>hello@gradstudio.vn</p>
          <p>Mở cửa 08:00–20:00 mỗi ngày</p>
        </div>
        <div className="flex flex-col gap-2 text-sand">
          <p className="font-semibold text-cream">Về trang này</p>
          <p>Ảnh minh họa từ Unsplash.</p>
          <p>Đồ án CSC13008 · Nhóm 24120184 – 24120294.</p>
        </div>
      </div>
    </footer>
  )
}

/** Khung chung của một màn: header → main → thanh demo → footer. */
export function PageShell({ title, header, children }) {
  // Đặt document.title thay vì render <title>: React 19 sẽ chèn thêm một <title> thứ hai vào <head>
  // (index.html đã có sẵn một cái), W3C báo lỗi.
  useEffect(() => {
    document.title = `${title} · GradStudio`
  }, [title])

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      {header}
      <main className="flex flex-1 flex-col">{children}</main>
      <DemoNav />
      <SiteFooter />
    </div>
  )
}
