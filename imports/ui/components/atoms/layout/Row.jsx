import styled from 'styled-components'

import { MediaSmall } from '../../../styles/media'

export const Row = styled.div`
  position: relative;
  width: 50%;
  display: 'flex';
  justify-content: 'center';
  align-items: center;
  flex-flow: ${({ flow }) => flow || 'column'};
  margin: 1rem 1.5rem;

  @media ${MediaSmall} {
    width: 100%;
    margin: 1rem 0.5rem;
  }
`
