import { capitalizeFirst } from '../../core/utils'

export default {
  registerModel({ commit, dispatch, rootState }, model) {
    commit('registerModel', model)

    // #region
    // add "MODELS" header if doesn't exists
    const menu = rootState['admin-sidebar'].menu
    const found = menu.some(m => m.text === 'models')
    if (!found)
      dispatch(
        'admin-sidebar/pushItem',
        {
          header: true,
          text: 'Models',
        },
        { root: true },
      )
    // #endregion

    // #region
    // register/show model link in sidebar's menu
    const name = model.config.name + 's'
    const router = model.config.router || name
    dispatch(
      'admin-sidebar/pushItem',
      {
        icon: 'icon-user',
        text: capitalizeFirst(name),
        children: [
          {
            text: 'Show all',
            route: `/models/${router.toLowerCase()}`,
          },
          {
            text: 'Create',
            route: `/models/${router.toLowerCase()}/create`,
          },
        ],
      },
      { root: true },
    )
    // #endregion
  },
}
