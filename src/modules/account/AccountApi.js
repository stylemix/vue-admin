import AdminApi from '../../plugins/api'

class AccountApi extends AdminApi {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('account', parameters)
  }

  user() {
    return this.submit('GET', `${this.endpoint}`)
  }
}

export default AccountApi
