/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { useMutation } from '@apollo/react-hooks'

export const withMutation = (mutation, refetchQuery) => Component => {
  const Mutation = props => {
    const refetchQueries = refetchQuery ? [{ query: refetchQuery }] : []
    const [mutate] = useMutation(mutation, { refetchQueries })
    return (
      <Component
        {...props}
        mutate={values => mutate({ variables: { values } })}
      />
    )
  }

  return Mutation
}
