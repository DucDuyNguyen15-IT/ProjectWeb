import { useRef } from 'react'
import { ActionButton, Chip, CARD } from '../ui.jsx'
import { Check } from '../Icons.jsx'
import { BOOKING_STATUS, booking } from '../../data/lichChup.js'

function Row({ term, children, accent = false, divider = false }) {
  return (
    // flex: cột nào chữ dài hơn thì được rộng hơn ("Bao gồm…" ở bên phải, "Còn lại 70%…" ở bên trái).
    <div className={`flex justify-between gap-3 ${divider ? 'border-t border-line pt-2' : ''}`}>
      <dt className="min-w-0 text-muted">{term}</dt>
      <dd className={`min-w-0 text-right font-semibold ${accent ? 'text-brand' : ''}`}>{children}</dd>
    </div>
  )
}

/**
 * Thẻ booking GS-1024. "Thanh toán cọc 30%" là nút brand đặc duy nhất của Màn 3:
 * mở hộp "Mô phỏng thanh toán" (<dialog> gốc của trình duyệt: giữ focus bên trong, Esc để đóng).
 * Hủy → vẫn Chờ cọc. Thanh toán thành công → Đã đặt lịch (onPaid).
 */
export default function BookingCard({ status, onPaid, className = '' }) {
  const dialog = useRef(null)
  const paid = status === 'booked'
  const s = BOOKING_STATUS[status]

  function succeed() {
    dialog.current.close()
    onPaid()
  }

  return (
    <section aria-labelledby="bk" className={`${CARD} flex flex-col gap-4 border-t-4 border-gold p-4 md:p-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2" aria-live="polite">
        <p className="text-sm font-semibold tracking-widest text-brand">{booking.code}</p>
        <Chip tone={s.tone} dot>{s.label}</Chip>
      </div>
      <h2 id="bk" className="text-2xl xl:text-3xl">{booking.title}</h2>

      <dl className="flex flex-col gap-3 border-t border-line pt-4">
        {booking.details.map(([k, v]) => <Row key={k} term={k}>{v}</Row>)}
      </dl>

      <dl className="flex flex-col gap-2 rounded-2xl bg-sand-soft p-4">
        <Row term="Giá gói">{booking.price}</Row>
        <Row term="Cọc 30%" accent>{paid ? `${booking.deposit} · Đã thanh toán` : booking.deposit}</Row>
        <Row divider term="Còn lại 70% · Thanh toán sau buổi chụp">{booking.remaining}</Row>
      </dl>

      {paid ? (
        <p className="flex items-start gap-2 rounded-2xl bg-success-soft px-4 py-3 text-success">
          <Check />
          Đã nhận cọc. Hẹn bạn 13:00 thứ Bảy 24/10 để makeup.
        </p>
      ) : (
        <>
          <ActionButton variant="primary" full onClick={() => dialog.current.showModal()} aria-haspopup="dialog">
            Thanh toán cọc 30% · {booking.deposit}
          </ActionButton>
          <p className="text-sm text-muted">Lịch được giữ chính thức sau khi studio nhận cọc.</p>
        </>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="tt-title"
        className="m-auto w-11/12 max-w-md rounded-2xl bg-paper p-6 text-ink shadow-card backdrop:bg-ink/60"
      >
        <div className="flex flex-col gap-4">
          <h2 id="tt-title" className="text-2xl">Mô phỏng thanh toán</h2>
          <p>
            Cọc 30% cho booking {booking.code}: <strong>{booking.deposit}</strong>
          </p>
          <p className="text-muted">
            Bản demo không kết nối cổng thanh toán. Chọn kết quả giao dịch để xem lịch chụp thay đổi thế nào.
          </p>
          <div className="flex flex-col gap-3 md:flex-row-reverse">
            <ActionButton variant="primary" onClick={succeed}>Thanh toán thành công</ActionButton>
            <ActionButton onClick={() => dialog.current.close()}>Hủy</ActionButton>
          </div>
        </div>
      </dialog>
    </section>
  )
}
