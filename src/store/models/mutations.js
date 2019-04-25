export default {
  registerModel(state, model) {
    state.map.set(model.config.name, model)
  }
}
