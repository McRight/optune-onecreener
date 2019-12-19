import React from 'react'
import styled, { css } from 'styled-components'

import {
  ColorHaiti,
  ColorStormGray,
  ColorHarlequin,
  ColorWhite,
} from '../../../styles/color'

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: ${({ secondary, disabled }) =>
    (disabled && ColorStormGray) ||
    (secondary && ColorHarlequin) ||
    ColorWhite};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  ${({ round }) =>
    round
      ? css`
          line-height: 40px;
          padding: 0px;
          width: 40px;
          overflow: hidden;
        `
      : css`
          line-height: 1.2;
          padding: 16px;
          width: auto;
          overflow: none;
        `};

  min-height: 40px;
  background-color: ${({ secondary, disabled }) =>
    (secondary && ColorWhite) || (disabled && ColorHaiti) || ColorHarlequin};
  border-radius: ${({ secondary, round }) =>
    round ? '50%' : secondary ? '2px' : '3px'};
  border: none;
  box-shadow: ${({ shadow }) =>
    shadow
      ? '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 0 0 rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.05)'
      : 'none'};
  padding: 0.5rem 1rem;

  & svg.icon {
    height: 24px;
    width: 24px;
  }

  &:hover:not([disabled]) {
    color: ${ColorHarlequin};
    background-color: ${ColorHaiti};

    & svg {
      & path,
      line,
      circle,
      polygon,
      polyline,
      rect,
      ellipse {
        fill: ${ColorHarlequin};
        stroke: ${ColorHarlequin};
        transition: fill 0.3s ease-out, stroke 0.3s ease-out;

        &[fill='none'] {
          fill: none;
        }

        &[stroke='none'] {
          stroke: none;
        }
      }
    }
  }

  transition: color 0.3s ease-out, background-color 0.3s ease-out;
`

export const Button = ({ children, ...other }) => (
  <StyledButton type="button" {...other}>
    {children}
  </StyledButton>
)
