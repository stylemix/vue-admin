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
    const data = {
      email,
      password,
      scope: '',
    }

    return this.request('post', `${this.endpoint}/login`, data)
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
}

export default AuthApi
