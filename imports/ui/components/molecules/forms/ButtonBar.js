/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Link } from '@reach/router'
import styled from 'styled-components'

// Styles
import {
  ColorHarlequin,
  ColorHaiti,
  ColorStormGray,
  ColorWhite,
} from '../../../styles/color'

// Atoms
import { Button } from '../../atoms/buttons/Button'

const BottomNavigation = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 0;
  background: ${ColorWhite};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
  z-index: 9;
`
const NavigationBar = styled.ul`
  position: relative;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0.5rem 0 1rem;
`

const NavigationItem = styled.li`
  display: flex;
  justify-content: center;
  flex-grow: ${({ primary }) => (primary ? 2 : 1)};
  width: 30%;
`

const SubmitButton = styled(Button)`
  width: 180px;

  &:hover:not([disabled]) {
    color: ${ColorHarlequin};
    background-color: ${ColorHaiti};
  }
`

const handleSubmit = ({ dirty, event, onSave, onSubmitFinished, onSubmit }) => {
  event.preventDefault()

  if (dirty) {
    onSave(values => onSubmit({ variables: { values } }))
      .then(result => onSubmitFinished(result.data))
      .catch(error => onSubmitFinished({ error }))
  }
}

const ActionButton = ({
  buttonText,
  dirty,
  mutation,
  onSave,
  refetchQuery,
}) => {
  const refetchQueries =
    (refetchQuery &&
      Array.isArray(refetchQuery) &&
      refetchQuery.map(query => ({ query }))) ||
    (refetchQuery && [{ query: refetchQuery }]) ||
    []
  const [mutate] = useMutation(mutation, { refetchQueries })

  return (
    <SubmitButton
      disabled={!dirty}
      onClick={event =>
        handleSubmit({
          dirty,
          event,
          onSave,
          onSubmit: mutate,
          onSubmitFinished: result => {
            if (result.error) {
              console.error(error)
            } else {
              console.log(result)
            }
          },
        })
      }
    >
      {buttonText}
    </SubmitButton>
  )
}

export const ButtonBar = ({
  dirty,
  mutation,
  navLink,
  navText,
  onSave,
  refetchQuery,
  saveText,
}) => (
  <BottomNavigation>
    <NavigationBar>
      <NavigationItem />
      <NavigationItem primary>
        <ActionButton
          buttonText={saveText}
          dirty={dirty}
          mutation={mutation}
          onSave={onSave}
          refetchQuery={refetchQuery}
        />
      </NavigationItem>
      <NavigationItem>
        <Link to={navLink}>
          <Button secondary>{navText}</Button>
        </Link>
      </NavigationItem>
    </NavigationBar>
  </BottomNavigation>
)
