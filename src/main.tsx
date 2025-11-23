import { worker } from '@/mocks/browser'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

async function enableMocking() {
  if (!import.meta.env.DEV) {
    // true MSW on, false MSW off
    return
  }

  return worker.start({
    onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 실제 서버로 전달
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
