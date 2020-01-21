import { ApiBase } from 'stylemix-base'

class AccountApi extends ApiBase {
  /**
   * The constructor for the ArtistProxy.
   */
  constructor() {
    super('account')
  }

  user() {
    return this.request('GET', `/${this.endpoint}`)
  }
}

export default AccountApi
