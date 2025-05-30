import { StrictMode } from 'react'
import 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
