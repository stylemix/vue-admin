import Vue from 'vue'
import Loader from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loader)

/**
 * @param {Promise} promise
 * @param {object} options
 * @param {HTMLElement} element
 */
Vue.prototype.$uiBlocker = function(promise, element = null, options = {}) {
  let oldStylePosition = ''
  if (element) {
    oldStylePosition = element.style.position
    element.style.position = 'relative'
  }

  const promiseWeCanObserveState = promiseStateWrapper(promise)

  // by default if not delay preset it will be equal to 200ms
  const delay = options ? options.delay || 200 : 200

  setTimeout(() => {
    /**
     * if after @param options.delay millisecond
     * @param promise is not resolved or rejected yet
     * show ui blocker
     *
     * doing that we avoid extra animation for fast
     * resolvable promises
     */
    if (promiseWeCanObserveState.isPending()) {
      const loader = this.$loading.show({ ...options, container: element })

      promise.finally(() => {
        // if animation is started, show minimum
        //  0.2s (200ms) animation for beauty
        setTimeout(() => {
          element ? (element.style.position = oldStylePosition) : undefined
          loader.hide()
        }, 200)
      })
    }
  }, delay)

  return promise
}

const promiseStateWrapper = promise => {
  // Don't modify any promise that has been already modified.
  if (promise.isResolved) return promise

  // Set initial state
  var isPending = true
  var isRejected = false
  var isFulfilled = false

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function(v) {
      isFulfilled = true
      isPending = false
      return v
    },
    function(e) {
      isRejected = true
      isPending = false
      throw e
    },
  )

  result.isFulfilled = function() {
    return isFulfilled
  }
  result.isPending = function() {
    return isPending
  }
  result.isRejected = function() {
    return isRejected
  }
  return result
}
