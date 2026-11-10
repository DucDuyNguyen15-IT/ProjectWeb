import { CARD, DisabledButton } from '../ui.jsx'
import { timeline, week } from '../../data/lichChup.js'

/** Lịch tuần 43 và dòng thời gian ngày 24/10. */
export function WeekCalendar({ className = '' }) {
  return (
    <section aria-labelledby="thang" className={`${CARD} flex flex-col gap-4 p-4 md:gap-6 md:p-6 xl:p-8 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="thang" className="text-2xl xl:text-3xl">{week.title}</h2>
        <p className="text-sm uppercase tracking-widest text-muted">{week.label}</p>
      </div>

      <ol aria-label={week.label} className="grid grid-cols-7 gap-1 md:gap-2">
        {week.days.map(([dow, day]) => {
          const selected = day === week.selected
          return (
            <li
              key={day}
              aria-current={selected ? 'date' : undefined}
              className={`flex flex-col items-center gap-1 rounded-lg py-2 ${selected ? 'bg-ink text-cream' : ''}`}
            >
              <span className={`text-sm ${selected ? 'text-cream' : 'text-muted'}`}>{dow}</span>
              <span className="font-serif text-xl">{day}</span>
              <span aria-hidden="true" className={`size-1 rounded-full ${selected ? 'bg-gold' : ''}`} />
            </li>
          )
        })}
      </ol>

      <div className="border-t border-line" />
      <h3 className="text-sm font-semibold uppercase tracking-widest text-brand">{week.dayTitle}</h3>

      <ol className="flex flex-col">
        {timeline.map((t) => (
          <li key={t.time} className="grid grid-cols-12 gap-4">
            <span aria-hidden="true" className="col-span-2 flex flex-col items-center gap-1 md:col-span-1">
              <span className="inline-flex size-10 items-center justify-center rounded-full border border-gold bg-paper text-sm text-brand">
                {t.icon}
              </span>
              <span className="w-0.5 flex-1 bg-line" />
            </span>
            <div className="col-span-10 flex flex-col gap-1 pb-4 md:col-span-11">
              {t.cancelled ? (
                <p className="font-serif text-xl text-muted">
                  <del>{t.time}</del>
                </p>
              ) : (
                <p className="font-serif text-xl text-brand">{t.time}</p>
              )}
              <p className={`font-semibold ${t.cancelled ? 'text-muted' : ''}`}>{t.title}</p>
              <p className="text-muted">{t.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Bản đồ minh họa (vẽ bằng khối màu, chỉ trang trí) và địa điểm studio. */
export function StudioMap({ className = '' }) {
  return (
    <section aria-labelledby="dia-diem" className={`${CARD} overflow-hidden ${className}`}>
      <div aria-hidden="true" className="relative h-40 bg-sand">
        <div className="absolute inset-x-0 top-24 h-4 bg-paper" />
        <div className="absolute inset-y-0 left-1/2 w-4 bg-paper" />
        <div className="absolute top-4 left-4 h-12 w-1/3 rounded-lg bg-line" />
        <div className="absolute top-6 right-6 size-12 rounded-full bg-success-soft" />
        <span className="absolute top-10 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 font-serif text-sm text-cream">
          GradStudio
        </span>
        <span className="absolute right-2 bottom-2 rounded-lg bg-paper px-2 py-1 text-sm text-muted">Bản đồ minh họa</span>
      </div>
      <div className="flex flex-col items-start gap-3 p-4 md:p-6">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id="dia-diem" className="font-sans text-base font-semibold">GradStudio</h2>
          <p className="text-muted">TP. Hồ Chí Minh · Địa chỉ sẽ gửi khi đặt cọc</p>
        </div>
        <DisabledButton>Xem đường đi</DisabledButton>
      </div>
    </section>
  )
}
