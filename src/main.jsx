import React from 'react'
import ReactDOM from 'react-dom/client'
import { AloweeApp } from './AloweeApp.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <AloweeApp />
    </Provider>
  </React.StrictMode>,
)
