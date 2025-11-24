import App from '@/app/App'
import { worker } from '@/mocks/browser'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'

async function enableMocking() {
  // true MSW on, false MSW off
  if (!import.meta.env.DEV) {
    return
  }

  return worker.start({
    onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 실제 서버로 전달
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  )
})
