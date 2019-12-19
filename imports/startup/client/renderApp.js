// React
import React from 'react'

// GraphQL
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './graphQLClient'

// Routes
import { Routes } from '../../ui/components/app/Routes'

export const renderApp = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)
