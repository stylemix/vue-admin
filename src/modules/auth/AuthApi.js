import { ApiBase } from 'stylemix-base'

class AuthApi extends ApiBase {
  /**
   * The constructor for the AuthApi.
   */
  constructor() {
    super('auth')
  }

  /**
   * Method used to login.
   *
   * @param {String} email The email.
   * @param {String} password The password.
   *
   * @returns {Promise} The result in a promise.
   */
  login({ email, password }) {
    return this.request('post', `${this.endpoint}/login`, {
      email,
      password,
    })
  }

  /**
   * Refresh token
   */
  refresh() {
    return this.request('post', `${this.endpoint}/refresh`)
  }

  /**
   * Request for forgot password
   */
  forgot(email) {
    return this.request(
      'post',
      `${this.endpoint}/password/email`,
      { email },
      {
        headers: {
          Authorization: null,
        },
      },
    )
  }

  /**
   * Request for authenticated account data
   */
  account() {
    return this.request('get', 'account').then(result => result.data)
  }
}

export default AuthApi
