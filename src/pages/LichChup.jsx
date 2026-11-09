import { useState } from 'react'
import { CustomerHeader, PageShell } from '../components/layout.jsx'
import BookingCard from '../components/lich-chup/BookingCard.jsx'
import { StudioMap, WeekCalendar } from '../components/lich-chup/Schedule.jsx'
import { ActionButton, CARD, CONTAINER } from '../components/ui.jsx'
import { TABS } from '../data/lichChup.js'

/*
  Màn 3: Linh xem booking GS-1024, chờ cọc 30%. Điểm cuối của luồng chính.
  Trạng thái booking ở đây: mở thẳng đường dẫn luôn bắt đầu ở "pending" (Chờ cọc).

  Bố cục (LAYOUT.md):
  - 360:  thẻ booking → lịch tuần → bản đồ
  - 768:  [thẻ booking | bản đồ] / lịch tuần rộng hết
  - 1280: [lịch tuần (7 cột) | thẻ booking + bản đồ (5 cột)]
*/
export default function LichChup() {
  const [tab, setTab] = useState('all')
  const [status, setStatus] = useState('pending')
  const showBooking = TABS.find((t) => t.id === tab).shows.includes(status)

  function reset() {
    setStatus('pending')
    setTab('all')
  }

  return (
    <PageShell title="Lịch chụp của tôi" header={<CustomerHeader />}>
      <div className={`${CONTAINER} flex flex-col gap-6 pt-8 pb-12 md:gap-8 md:pt-12 xl:pb-16`}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl xl:text-5xl">Lịch chụp của tôi</h1>
            <ActionButton onClick={reset}>Đặt lại demo</ActionButton>
          </div>
          <p className="text-muted">Xem lại lịch đã thống nhất với studio và thanh toán cọc để giữ lịch.</p>
          <div role="group" aria-label="Lọc theo trạng thái" className="flex flex-wrap gap-x-6 border-b border-line">
            {TABS.map((t) => {
              const active = t.id === tab
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex min-h-11 items-center gap-1 border-b-2 ${
                    active ? 'border-gold font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {t.label} <span className="text-muted">{t.shows.includes(status) ? 1 : 0}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-start xl:grid-cols-12 xl:gap-8">
          {showBooking ? (
            <BookingCard status={status} onPaid={() => setStatus('booked')} className="min-w-0 md:col-start-1 md:row-start-1 xl:col-span-5 xl:col-start-8" />
          ) : (
            <section
              aria-labelledby="trong"
              className={`${CARD} flex min-w-0 flex-col gap-2 p-4 md:col-start-1 md:row-start-1 md:p-6 xl:col-span-5 xl:col-start-8`}
            >
              <h2 id="trong" className="text-2xl xl:text-3xl">Chưa có lịch chụp</h2>
              <p className="text-muted">Chưa có lịch chụp nào ở mục này.</p>
            </section>
          )}
          <StudioMap className="min-w-0 md:col-start-2 md:row-start-1 xl:col-span-5 xl:col-start-8 xl:row-start-2" />
          <WeekCalendar className="min-w-0 md:col-span-2 md:row-start-2 xl:col-span-7 xl:col-start-1 xl:row-start-1 xl:row-span-2" />
        </div>
      </div>
    </PageShell>
  )
}
