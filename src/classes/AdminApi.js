import qs from 'qs'
import { ApiResource } from 'stylemix-base'

class AdminApi extends ApiResource {
  /**
   * @inheritDoc
   */
  request(method, url, data = null, config = {}) {
    config = {
      paramsSerializer(params) {
        return qs.stringify(params, { encodeValuesOnly: true })
      },
      ...config,
    }

    if (data instanceof FormData && method.toUpperCase() === 'PUT') {
      method = 'POST'
      config.headers = config.headers || {}
      config.headers['Content-Type'] = 'multipart/form-data'
      data.append('_method', 'PUT')
    }

    return super.request(method, url, data, config)
  }

  /**
   * @deprecated
   * @see request()
   */
  submit(config = {}) {
    return this.get(config)
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   * @deprecated
   * @see get()
   */
  all(config = {}) {
    return this.get(config)
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
    return this.request(
      'post',
      `/${this.endpoint}/bulk-destroy`,
      { ids },
      config,
    )
  }
}

export default AdminApi
