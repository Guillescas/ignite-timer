import { NavLink } from 'react-router-dom'

import { Timer, Scroll } from 'phosphor-react'

import logo from '../../assets/logo.svg'

import * as Styles from './styles'

export function Header() {
  return (
    <Styles.Container>
      <img src={logo} alt="" />

      <nav>
        <NavLink to="/" title="Timer" end>
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Styles.Container>
  )
}
