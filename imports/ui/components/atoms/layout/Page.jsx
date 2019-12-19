import styled from 'styled-components'

import { ColorWhite } from '../../../styles/color'
import { MediaSmall } from '../../../styles/media'

export const Page = styled.div`
  position: relative;
  background-color: ${ColorWhite};
  height: 100%;
  margin: 2rem 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${MediaSmall} {
    margin: 1rem 0.5rem 4rem;
  }
`
