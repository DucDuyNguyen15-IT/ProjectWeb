import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './App.jsx'
import './index.css'

// HashRouter: mỗi màn mở thẳng được bằng /#/duong-dan trên mọi static server,
// không cần server trả index.html cho đường dẫn lạ.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
