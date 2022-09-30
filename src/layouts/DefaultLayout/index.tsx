import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'

import * as Styles from './styles'

export function DefaultLayout() {
  return (
    <Styles.Container>
      <Header />

      <Outlet />
    </Styles.Container>
  )
}
