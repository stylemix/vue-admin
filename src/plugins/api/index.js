import Vue from 'vue'
import qs from 'qs'
import defaults from 'lodash-es/defaults'

class AdminApi {
  /**
   * The constructor of the AdminApi.
   *
   * @param {string} endpoint   The endpoint being used.
   * @param {Object} parameters The parameters for the request.
   */
  constructor(endpoint, parameters = {}) {
    this.endpoint = endpoint
    this.parameters = parameters
  }

  /**
   * Method used to set the query parameters.
   *
   * @param {Object} parameters The given parameters.
   *
   * @returns {this} The instance of the Api.
   */
  setParameters(parameters) {
    Object.keys(parameters).forEach(key => {
      this.parameters[key] = parameters[key]
    })

    return this
  }

  /**
   * Method used to set a single parameter.
   *
   * @param {string} parameter The given parameter.
   * @param {*} value The value to be set.
   *
   * @returns {this} The instance of the Api.
   */
  setParameter(parameter, value) {
    this.parameters[parameter] = value

    return this
  }

  /**
   * Method used to remove all the parameters.
   *
   * @param {Array} parameters The given parameters.
   *
   * @returns {this} The instance of the Api.
   */
  removeParameters(parameters) {
    parameters.forEach(parameter => {
      delete this.parameters[parameter]
    })

    return this
  }

  /**
   * Method used to remove a single parameter.
   *
   * @param {string} parameter The given parameter.
   *
   * @returns {this} The instance of the Api.
   */
  removeParameter(parameter) {
    delete this.parameters[parameter]

    return this
  }

  /**
   * Set flag to receive full response object when resolving
   *
   * @param {Boolean} flag
   *
   * @returns {this} The instance of the Api.
   */
  withResponse(flag = true) {
    this._withResponse = flag

    return this
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      method The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   * @param {Object}      config
   *
   * @returns {Promise} The result in a promise.
   */
  submit(method, url, data = null, config = {}) {
    const request = defaults(
      {
        method,
        url,
        params: this.parameters,
        data,
      },
      config,
      {
        paramsSerializer(params) {
          return qs.stringify(params, { encodeValuesOnly: true })
        },
      },
    )

    if (request.data instanceof FormData && method.toUpperCase() === 'PUT') {
      request.method = 'POST'
      request.headers = config.headers || {}
      request.headers['Content-Type'] = 'multipart/form-data'
      request.data.append('_method', 'PUT')
    }

    return new Promise((resolve, reject) => {
      Vue.$http(request)
        .then(response => {
          resolve(this._withResponse ? response : response.data)
        })
        .catch(({ response }) => {
          if (response) {
            reject(response)
          } else {
            reject(arguments[0])
          }
        })
    })
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  all(config = {}) {
    return this.submit('get', `/${this.endpoint}`, null, config)
  }

  /**
   * Method used to fetch a single item from the API.
   *
   * @param {int} id The given identifier.
   * @param {Object} config Extra request config
   *
   * @returns {Promise} The result in a promise.
   */
  find(id, config = {}) {
    return this.submit('get', `/${this.endpoint}/${id}`, null, config)
  }

  /**
   * Method used to get a create form.
   *
   * @returns {Promise} The result in a promise.
   */
  create(config = {}) {
    return this.submit('get', `/${this.endpoint}/create`, null, config)
  }

  /**
   * Method used to store a new item.
   *
   * @param {Object} item The given item.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  store(item, config = {}) {
    return this.submit('post', `/${this.endpoint}`, item, config)
  }

  /**
   * Method used to get an edit for for the item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  edit(id, config = {}) {
    return this.submit('get', `/${this.endpoint}/${id}/edit`, null, config)
  }

  /**
   * Method used to update an item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} item The given item.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  update(id, item, config = {}) {
    return this.submit('put', `/${this.endpoint}/${id}`, item, config)
  }

  /**
   * Method used to destroy an item.
   *
   * @param {int} id The given identifier.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  destroy(id, config = {}) {
    return this.submit('delete', `/${this.endpoint}/${id}`, null, config)
  }

  /**
   * Method used to bulk-destroy.
   *
   * @param {Array} ids The given identifier list.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  bulkDestroy(ids, config) {
    return this.submit(
      'post',
      `/${this.endpoint}/bulk-destroy`,
      { ids },
      config,
    )
  }

  /**
   * Method used to transform a parameters object to a parameters string.
   *
   * @returns {string} The parameter string.
   */
  getParameterString() {
    const parameterStrings = qs.stringify(this.parameters, {
      encodeValuesOnly: true,
    })

    return parameterStrings === '' ? '' : `?${parameterStrings}`
  }
}

export default AdminApi
