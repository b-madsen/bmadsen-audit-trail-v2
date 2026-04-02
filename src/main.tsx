import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@bamboohr/fabric/dist/minimal-styles.css'
import { BaseStyles, ThemeProvider } from '@bamboohr/fabric'
import App from './App'
import './index.css'

// Enable Encore theme before any Fabric components render
document.body.setAttribute('data-fabric-theme', 'encore')

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider themeName="encore">
        <BaseStyles>
          <App />
        </BaseStyles>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
