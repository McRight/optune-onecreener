import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

// Styles
import { ColorHarlequin } from '../../../styles/color'

// Atoms
import { BigText } from '../../atoms/text/BigText'
import { Page } from '../../atoms/layout/Page'

const LoadingContent = styled.svg`
  width: 200px;
  height: 200px;
`
const LoadingCircle = styled.circle`
  fill: none;
  stroke: ${ColorHarlequin};
  stroke-linecap: round;
  stroke-width: 7;
  animation: circley 5.333s ease infinite, rotaty 2.2s linear infinite;
  transform-origin: center center;
`

const LoadingText = styled.p`
  margin-top: 20px;
`

export const PageLoading = ({ label }) => (
  <Page>
    <div className="animated">
      <LoadingContent>
        <LoadingCircle cx="100" cy="100" r="40" />
      </LoadingContent>

      <BigText>{label}</BigText>
    </div>
  </Page>
)

PageLoading.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
