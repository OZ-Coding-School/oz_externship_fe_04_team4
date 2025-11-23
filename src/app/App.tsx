import AppRouter from '@/app/router'
import { BrowserRouter } from 'react-router'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
