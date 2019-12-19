import { load } from 'graphql-load'

import typeDefs from '../schema/index.graphql'

import { Query } from './queries'
import { Mutation } from './mutations'

/*
 * Resolvers
 */

const resolvers = {
  Query,
  Mutation,
}

load({
  typeDefs,
  resolvers,
})
