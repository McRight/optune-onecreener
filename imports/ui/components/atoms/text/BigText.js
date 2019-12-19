import styled from 'styled-components'

import { ColorHaiti, ColorMonza } from '../../../styles/color'

export const BigText = styled.h2`
  color: ${({ warning }) => (warning ? ColorMonza : ColorHaiti)};
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0.5rem auto 1.5rem;
  text-align: center;
`
