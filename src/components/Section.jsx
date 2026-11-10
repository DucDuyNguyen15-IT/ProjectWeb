import { CONTAINER } from './ui.jsx'

/** Một khối nội dung có h2 riêng, nền tùy chọn trải hết chiều ngang. */
export default function Section({ id, title, intro, tone = '', children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-4 py-12 xl:py-16 ${tone}`}>
      <div className={`${CONTAINER} flex flex-col gap-6 md:gap-8`}>
        <div className="flex flex-col gap-2">
          <h2 id={`${id}-title`} className="text-2xl text-balance xl:text-3xl">{title}</h2>
          {intro && <p className="text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
