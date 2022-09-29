import { ThemeProvider } from 'styled-components'

import Button from './components/Button'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/globals'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Button></Button>
      </div>

      <GlobalStyles />
    </ThemeProvider>
  )
}
