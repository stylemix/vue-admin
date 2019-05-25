import pluralize from 'pluralize'

export default {
  registerModel(state, model) {
    let name = null

    // try to find route binding for model
    const routeBinding = model.config.routeBinding
      ? model.config.routeBinding
      : null
    if (routeBinding) {
      name = routeBinding
    } else {
      // route binding not found, so
      // use pluralized version of model name
      name = pluralize(model.config.name.toLocaleLowerCase())
    }

    state.map.set(name, model)
  }
}
