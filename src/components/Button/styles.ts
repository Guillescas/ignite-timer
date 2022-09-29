import styled from 'styled-components'

import { IContainerProps } from './types'

export const Container = styled.div<IContainerProps>`
  background: ${({ theme }) => theme.colors['green-500']};
  color: ${({ theme }) => theme.colors.white};
`
