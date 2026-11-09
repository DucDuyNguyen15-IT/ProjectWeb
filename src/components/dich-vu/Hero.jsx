import { ActionButton, Eyebrow, CONTAINER } from '../ui.jsx'

const POINTS = ['Tư vấn trực tiếp trên web', 'Không lo trùng lịch', 'Chọn ảnh ngay trong tài khoản']

/**
 * Hero Màn 1. 360/768: chữ ở trên, khung chat ngay dưới (vẫn trên nền tối);
 * 1280: chữ bên trái, chat bên phải.
 * Hai nút cuộn trong trang là <button>, không dùng href="#…" vì HashRouter coi đó là một route.
 */
export default function Hero({ chat, onSeePackages, onOpenChat }) {
  return (
    <section aria-labelledby="hero-title" className="bg-ink-2 text-paper">
      <div className={`${CONTAINER} grid gap-8 pt-12 pb-12 md:pt-16 xl:grid-cols-12 xl:items-end xl:gap-16 xl:pb-16`}>
        <div className="flex min-w-0 flex-col gap-6 xl:col-span-7">
          <Eyebrow tone="light">Studio ảnh tốt nghiệp &amp; chân dung</Eyebrow>
          <h1 id="hero-title" className="text-4xl text-balance md:text-5xl xl:text-7xl">
            Lưu lại ngày <em className="text-gold-light">ra trường</em> theo cách của bạn
          </h1>
          <p className="max-w-xl text-sand">
            Kỷ yếu lớp, tốt nghiệp, chân dung CV. Tư vấn ngay trên web, chốt lịch rõ ràng, chọn ảnh trong tài khoản của bạn.
          </p>
          <div className="flex flex-wrap gap-3">
            <ActionButton variant="light" onClick={onSeePackages}>Xem gói chụp</ActionButton>
            <ActionButton variant="light" onClick={onOpenChat}>Chat với studio</ActionButton>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sand">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-light" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 xl:col-span-5">{chat}</div>
      </div>
    </section>
  )
}
