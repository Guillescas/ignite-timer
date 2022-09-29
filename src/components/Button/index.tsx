import { ReactElement } from 'react'

import * as Styles from './styles'

import { IButtonProps } from './types'

function Button(props: IButtonProps): ReactElement {
  const { variant = 'primery' } = props

  return <Styles.Container variant={variant}>asdasd</Styles.Container>
}

export default Button
