export default {
  findModel(state) {
    return name => state.map.get(name)
  },
}
