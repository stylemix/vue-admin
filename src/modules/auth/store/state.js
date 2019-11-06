/* ============
 * State of the auth module
 * ============
 *
 * The initial state of the auth module.
 */

export default {
  authenticated: false,
  token: null,
  expires: 0,
  account: null,
  attemptedRoute: null,
}
