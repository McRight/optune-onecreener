/* global window, document */
/* eslint-disable */

import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import { renderApp } from '/imports/startup/client/renderApp'

import '/imports/startup/client/initI18next'

Meteor.startup(() => {
  /*
   * Render App
   */

  render(renderApp(),document.getElementById('render-target'))
})
