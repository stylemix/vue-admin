/**
 * Globally register all components
 * within "widgets" directory
 */

import Vue from 'vue'

const requireComponent = require.context(
  // look for files in the widgets directory
  './widgets',
  // don't look in subdirectories
  false,
  // only include "widget-" prefixed .vue files
  /widget-[\w-]+\.vue$/,
)

// for each matching file name...
requireComponent.keys().forEach(filename => {
  // get component config
  const componentConfig = requireComponent(filename)

  // get pascal (camel) cased version of filename
  const componentName = filename
    // remove the "./" from the beginning
    .replace(/^\.\//, '')
    // remove the file extension from the end
    .replace(/\.\w+$/, '')

  // globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})
