import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App'

async function enableMocking() {
  if (!import.meta.env.DEV) {
    // true MSW on, false MSW off
    return
  }
  const { worker } = await import('./mocks/browser') // 이전에 설정한 브라우저 환경설정 import

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
