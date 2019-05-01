import { stringify } from 'qs'

const AxiosConfig = {
  baseUrl: process.env.VUE_APP_API_LOCATION,
  paramsSerializer(params) {
    return stringify(params, { encodeValuesOnly: true })
  },
}

export default AxiosConfig
