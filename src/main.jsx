import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Kakao from './Kakao.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Kakao />
  </StrictMode>,
)
