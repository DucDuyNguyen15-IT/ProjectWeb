import { AdminHeader, PageShell } from '../components/layout.jsx'
import { ChatThread, ConversationHeader, SlotSuggestions } from '../components/hoi-thoai/Conversation.jsx'
import BookingForm from '../components/hoi-thoai/BookingForm.jsx'
import ResourceTable from '../components/hoi-thoai/ResourceTable.jsx'
import WaitingList from '../components/hoi-thoai/WaitingList.jsx'
import useConsultation from '../components/hoi-thoai/useConsultation.js'

/*
  Màn 2: Admin Thảo thấy trùng lịch makeup, đề xuất 14:00, Linh chốt, tạo booking.
  Luồng chính → Màn 3 qua "Tạo booking" (bật khi Linh đã chốt giờ).
  Trạng thái tư vấn nằm trong useConsultation(); mở thẳng /#/hoi-thoai luôn bắt đầu ở 09:00 bị trùng.

  Bố cục (LAYOUT.md):
  - 360:  tiêu đề → chat → gợi ý giờ → form → bảng → danh sách khách (dùng order-*)
  - 768:  tiêu đề / [chat + form | gợi ý giờ] / bảng / danh sách khách (grid 12 cột)
  - 1280: [danh sách khách | tiêu đề + chat + form | bảng + gợi ý giờ]
  Hai nhóm cột là `contents` dưới 1280 nên con của chúng xếp thẳng vào lưới ngoài.
*/
export default function HoiThoai() {
  const c = useConsultation()
  const last = c.messages[c.messages.length - 1]
  const linh = { status: c.linhStatus.label, tone: c.linhStatus.tone, preview: last.text, time: last.time }

  return (
    <PageShell title="Hội thoại" header={<AdminHeader />}>
      <div className="mx-auto w-full max-w-page px-4 pt-6 pb-12 md:px-8 md:pt-8 xl:pb-16">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-12 md:items-start xl:gap-8">
          <div className="contents min-w-0 xl:col-span-5 xl:col-start-4 xl:row-start-1 xl:flex xl:flex-col xl:gap-6">
            <ConversationHeader status={c.linhStatus} onReset={c.reset} className="order-1 min-w-0 md:col-span-12 md:row-start-1 xl:order-none" />
            <ChatThread messages={c.messages} phase={c.phase} onReply={c.reply} onSend={c.send} className="order-2 min-w-0 md:col-span-7 md:row-start-2 xl:order-none" />
            <BookingForm slot={c.slot} ready={c.phase === 'agreed'} onQuote={c.sendQuote} className="order-4 min-w-0 md:col-span-7 md:row-start-3 xl:order-none" />
          </div>
          <div className="contents min-w-0 xl:col-span-4 xl:col-start-9 xl:row-start-1 xl:flex xl:flex-col xl:gap-8">
            <ResourceTable showLinh={c.slot?.id === '14'} className="order-5 min-w-0 md:col-span-12 md:row-start-4 xl:order-none" />
            <SlotSuggestions slot={c.slot} phase={c.phase} canChoose={c.canChoose} onChoose={c.choose} className="order-3 min-w-0 md:col-span-5 md:col-start-8 md:row-start-2 md:row-span-2 xl:order-none" />
          </div>
          <WaitingList linh={linh} className="order-6 min-w-0 md:col-span-12 md:row-start-5 xl:order-none xl:col-span-3 xl:col-start-1 xl:row-start-1" />
        </div>
      </div>
    </PageShell>
  )
}
