import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'

import AppRouter from '@/app/router'
import './App.css'

export default function App() {
  const queryClient = new QueryClient()
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <AppRouter />
        </StrictMode>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
