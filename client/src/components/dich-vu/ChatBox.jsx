import { Avatar, ButtonLink, Chip, CARD, INPUT } from '../ui.jsx'
import { ArrowRight } from '../Icons.jsx'
import { chatMessages } from '../../data/dichVu.js'

/**
 * Khung chat với studio — thứ quan trọng nhất của Màn 1.
 * "Gửi" là <Link> sang Màn 2 (studio nhận câu hỏi), là nút brand đặc duy nhất của màn.
 */
export default function ChatBox({ topic, inputRef }) {
  return (
    <section id="tu-van" aria-labelledby="chat-title" className={`${CARD} flex scroll-mt-4 flex-col overflow-hidden text-ink`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-4 md:px-6">
        <Avatar>GS</Avatar>
        <div className="flex flex-col">
          <h2 id="chat-title" className="text-2xl">Chat với studio</h2>
          <p className="flex items-center gap-2 text-sm text-muted">
            <span aria-hidden="true" className="size-2 rounded-full bg-success" />
            GradStudio · Đang hoạt động
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 md:p-6">
        <p className="flex justify-center" aria-live="polite">
          <Chip tone="brand">Đang hỏi về: {topic}</Chip>
        </p>
        <ol className="flex flex-col gap-4">
          {chatMessages.map((m) => {
            const mine = m.from === 'me'
            return (
              <li key={m.id} className={`flex flex-col gap-1 ${mine ? 'items-end' : 'items-start'}`}>
                <p
                  className={`max-w-4/5 px-4 py-3 text-ink-soft ${
                    mine ? 'rounded-2xl rounded-br-sm bg-sand' : 'rounded-2xl rounded-bl-sm border border-line bg-cream'
                  }`}
                >
                  {m.text}
                </p>
                <p className="text-sm text-muted">{mine ? 'Bạn' : 'GradStudio'} · {m.time}</p>
              </li>
            )
          })}
        </ol>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 border-t border-line px-4 py-4 md:px-6">
        <label htmlFor="tin-nhan" className="font-semibold">Tin nhắn của bạn</label>
        <div className="flex items-center gap-2">
          <input ref={inputRef} id="tin-nhan" name="tin-nhan" type="text" placeholder="Nhập tin nhắn…" className={`${INPUT} min-w-0 flex-1`} />
          <ButtonLink to="/hoi-thoai">
            Gửi
            <ArrowRight />
          </ButtonLink>
        </div>
      </form>
    </section>
  )
}
