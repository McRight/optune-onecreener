import { Meteor } from 'meteor/meteor'

import { startGraphQLServer } from '/imports/startup/server/graphql'
import { loadData } from '/imports/startup/server/loadData'

import pkg from '../package.json'

Meteor.startup(() => {
  console.log(`Starting ${pkg.name} ...`)

  // Load data
  userId = loadData()
  console.log('✅ Data loaded')

  // Code to run on server startup.
  startGraphQLServer(userId)
  console.log('✅ GraphQL server initialized')
})
