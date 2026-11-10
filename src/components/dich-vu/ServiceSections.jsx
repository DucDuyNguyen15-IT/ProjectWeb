import Section from '../Section.jsx'
import { ActionButton, Avatar, Eyebrow, PhotoPlaceholder, CARD } from '../ui.jsx'
import { gallery, packages, reviews, steps } from '../../data/dichVu.js'

/** Gói chụp: 1 cột ở 360, 2 ở 768, 3 ở 1280. "Tư vấn gói này" đổi ngữ cảnh chat. */
export function PackageList({ onConsult }) {
  return (
    <Section id="goi-chup" title="Gói chụp" intro="Giá tham khảo. Studio báo giá chính xác trong chat.">
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((p) => (
          <li key={p.id} className={`${CARD} flex flex-col overflow-hidden`}>
            <PhotoPlaceholder caption={p.photo} />
            <div className="flex flex-1 flex-col gap-3 p-4 md:p-6">
              <Eyebrow>{p.tag}</Eyebrow>
              <h3 className="text-lg xl:text-xl">{p.name}</h3>
              <p className="text-muted">{p.description}</p>
              <p className="mt-auto">
                <span className="text-muted">Từ </span>
                <strong className="text-brand">{p.price}</strong>
              </p>
              <ActionButton full onClick={() => onConsult(p.topic)}>Tư vấn gói này</ActionButton>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Gallery() {
  return (
    <Section id="anh-mau" title="Ảnh mẫu" intro="Một vài buổi chụp gần đây của studio." tone="bg-paper">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:gap-6">
        {gallery.map((g) => (
          <li key={g.caption} className="overflow-hidden rounded-2xl">
            <PhotoPlaceholder caption={g.caption} ratio="aspect-4/5" tone={g.tone} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Process() {
  return (
    <Section id="quy-trinh" title="Quy trình" intro="Bốn bước từ lúc hỏi đến lúc nhận ảnh.">
      <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-4 md:p-6">
            <span aria-hidden="true" className="inline-flex size-10 items-center justify-center rounded-full border border-gold font-serif text-xl text-brand">
              {i + 1}
            </span>
            <h3 className="text-lg xl:text-xl">{s.title}</h3>
            <p className="text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Reviews() {
  return (
    <Section id="danh-gia" title="Khách nói gì" tone="bg-sand-soft">
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.name}>
            <figure className={`${CARD} flex h-full flex-col gap-4 p-4 md:p-6`}>
              <blockquote className="font-serif text-lg">“{r.quote}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <Avatar>{r.initial}</Avatar>
                <span className="flex flex-col">
                  <strong>{r.name}</strong>
                  <span className="text-sm text-muted">{r.detail}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
