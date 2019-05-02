import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/users'

export default {
  index(context) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: {
            _limit: context.limit,
            _page: context.page,
          },
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(reject)
    })
  },

  async create(context) {
    return context
  },

  async update(context) {
    return context
  },

  async delete(context) {
    return context
  },
}
