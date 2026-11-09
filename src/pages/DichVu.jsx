import { useRef, useState } from 'react'
import { CustomerHeader, PageShell } from '../components/layout.jsx'
import Hero from '../components/dich-vu/Hero.jsx'
import ChatBox from '../components/dich-vu/ChatBox.jsx'
import { Gallery, PackageList, Process, Reviews } from '../components/dich-vu/ServiceSections.jsx'
import { DEFAULT_TOPIC } from '../data/dichVu.js'
import { scrollToId } from '../utils/scroll.js'

// Màn 1: khách xem dịch vụ và chat hỏi lịch 24/10 09:00. Luồng chính → Màn 2 qua nút "Gửi".
export default function DichVu() {
  const [topic, setTopic] = useState(DEFAULT_TOPIC)
  const inputRef = useRef(null)

  function openChat() {
    scrollToId('tu-van')
    inputRef.current?.focus({ preventScroll: true })
  }

  function consult(packageTopic) {
    setTopic(packageTopic)
    openChat()
  }

  return (
    <PageShell
      title="Dịch vụ"
      header={
        <div className="bg-ink-2">
          <CustomerHeader dark />
        </div>
      }
    >
      <Hero
        chat={<ChatBox topic={topic} inputRef={inputRef} />}
        onSeePackages={() => scrollToId('goi-chup')}
        onOpenChat={openChat}
      />
      <PackageList onConsult={consult} />
      <Gallery />
      <Process />
      <Reviews />
    </PageShell>
  )
}
