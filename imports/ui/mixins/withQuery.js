/* eslint-disable react/display-name */

import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

// Styles
import { ColorMonza, ColorLightGrey } from '../styles/color'

// Molecules
import { PageLoading } from '../components/molecules/loading/PageLoading'

const ErrorContainer = styled.div`
  position: relative;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  padding: 20px;
  background: ${ColorLightGrey};
`

const ErrorTitle = styled.h1`
  color: ${ColorMonza};
`

const ErrorList = styled.ul`
  width: 100%;
`
const ErrorMessage = styled.li`
  width: 100%;
  margin-top: 20px;
`

const ErrorComponent = ({ errors }) => (
  <ErrorContainer>
    <ErrorTitle>ERROR</ErrorTitle>
    <ErrorList>
      {errors.map((error, index) => (
        <ErrorMessage key={index}>
          <p className="bold">{error.path}</p>
          <p>{error.message}</p>
        </ErrorMessage>
      ))}
    </ErrorList>
  </ErrorContainer>
)

const LoadingEmptyComponent = () => <div />

export const withQuery = (query, policy) => Component => {
  const Query = ({ hideLoading, ...other }) => {
    const { data, loading, error, refetch, networkStatus } = useQuery(query, {
      fetchPolicy: policy || 'cache-first', // 'network-only',
    })

    let errors
    if (error) {
      errors = error.graphQLErrors.map(e => ({
        path: e.path.join(' / '),
        message: e.message,
      }))
      // Logging and reporting is done in Apollo Client --> ErrorLink
    }

    if (error) return <ErrorComponent errors={errors} />

    if (loading && hideLoading) return <LoadingEmptyComponent />

    if (loading) return <PageLoading label="Loading" />

    return <Component refetch={refetch} {...data} {...other} />
  }

  return Query
}
