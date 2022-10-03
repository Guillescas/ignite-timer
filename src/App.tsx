import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import { CyclesContextoProvider } from './hooks/useCycles'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/globals'

import { Router } from './Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextoProvider>
          <Router />
        </CyclesContextoProvider>
      </BrowserRouter>

      <GlobalStyles />
    </ThemeProvider>
  )
}
