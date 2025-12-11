import { createRoot } from 'react-dom/client'

import App from '@/app/App'
import { worker } from '@/mocks/browser'
import './index.css'

async function enableMocking() {
  if (!import.meta.env.DEV) return

  if (import.meta.env.VITE_USE_MOCK !== 'true') return

  return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})
