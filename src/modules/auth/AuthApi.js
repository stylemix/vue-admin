import Api from '../../plugins/api'

class AuthApi extends Api {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('auth', parameters)
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

    return this.submit('post', `${this.endpoint}/login`, data)
  }

  /**
   * Refresh token
   */
  refresh() {
    return this.submit('post', `${this.endpoint}/refresh`)
  }

  /**
   * Request for forgot password
   */
  forgot(email) {
    return this.submit(
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
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `${this.endpoint}/register`, data)
  }
}

export default AuthApi
