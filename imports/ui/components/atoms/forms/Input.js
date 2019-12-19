import styled from 'styled-components'
import {
  ColorMonza,
  ColorStormGray,
  ColorLightGrey,
} from '../../../styles/color'
import { MediaSmall } from '../../../styles/media'

export const Input = styled.input`
  font-size: 1.4rem;
  width: calc(100% - 2.4rem);
  margin: 1rem 0;
  padding: 0.8rem 1.2rem;
  border-radius: 0.2rem;
  border: 1px solid ${ColorLightGrey};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  color: ${({ error, empty }) =>
    (error && ColorMonza) || (empty && ColorStormGray) || ColorStormGray};

  :focus {
    outline-style: none;
  }
`
