// This adds fetch as a global so that its API is consistent between client and server
import 'isomorphic-fetch'
import { stringify } from 'qs'
import merge from 'lodash/merge'
import toUpper from 'lodash/toUpper'
import cookie from 'cookie'
import Cookies from 'js-cookie'

import config from '../../../config'

export const checkStatus = response =>
  new Promise((resolve, reject) => {
    if (response.ok) return resolve(response)

    return response
      .json()
      .then(jsonError => {
        let error

        if (
          jsonError.errors &&
          Array.isArray(jsonError.errors) &&
          jsonError.errors.length > 0
        ) {
          error = new Error(
            jsonError.errors[0].message ||
              jsonError.errors[0].msg ||
              `${response.status} ${response.statusText}`,
          )
        } else {
          error = new Error(
            jsonError.message || `${response.status} ${response.statusText}`,
          )
        }

        error.response = jsonError

        return reject(error)
      })
      .catch(() => {
        const error = new Error(`${response.status} ${response.statusText}`)
        error.response = response

        return reject(error)
      })
  })

export const parseJSON = response => response.json()

export const parseSettings = ({
  method = 'get',
  data,
  locale,
  ...otherSettings
} = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  }

  const settings = merge(
    {
      body: data ? JSON.stringify(data) : undefined,
      method: toUpper(method),
      credentials: 'include',
      headers,
    },
    otherSettings,
  )

  return settings
}

export const parseEndpoint = (endpoint, params) => {
  const url =
    endpoint.indexOf('http') === 0 ? endpoint : config('apiUrl') + endpoint
  const querystring = params ? `?${stringify(params)}` : ''
  return `${url}${querystring}`
}

const api = {}

api.request = (endpoint, { params, ...settings } = {}) =>
  fetch(parseEndpoint(endpoint, params), parseSettings(settings))
    .then(checkStatus)
    .then(parseJSON)
;['delete', 'get'].forEach(method => {
  api[method] = (endpoint, settings) =>
    api.request(endpoint, { method, ...settings })
})
;['post', 'put', 'patch'].forEach(method => {
  api[method] = (endpoint, data, settings) =>
    api.request(endpoint, { method, data, ...settings })
})

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    // Ensure document.cookie is kept up-to-dater if in the browser
    Cookies.set(
      'token',
      token,
      // Requires cookies to be passed through HTTPS
      // { httpOnly: true },
    )

    this.settings.headers = {
      ...this.settings.headers,
      cookie: cookie.serialize('token', String(token), {
        // Requires cookies to be passed through HTTPS
        // httpOnly: true,
        path: '/',
      }),
    }
  },

  unsetToken() {
    // Ensure document.cookie is kept up-to-dater if in the browser
    Cookies.remove('token')

    this.settings.headers = {
      ...this.settings.headers,
      cookie: undefined,
    }
  },

  request(endpoint, requestSettings) {
    return api.request(endpoint, merge({}, this.settings, requestSettings))
  },

  post(endpoint, data, requestSettings) {
    return this.request(endpoint, { method: 'post', data, ...requestSettings })
  },

  get(endpoint, requestSettings) {
    return this.request(endpoint, { method: 'get', ...requestSettings })
  },

  put(endpoint, data, requestSettings) {
    return this.request(endpoint, { method: 'put', data, ...requestSettings })
  },

  patch(endpoint, data, requestSettings) {
    return this.request(endpoint, {
      method: 'patch',
      data,
      ...requestSettings,
    })
  },

  delete(endpoint, requestSettings) {
    return this.request(endpoint, { method: 'delete', ...requestSettings })
  },
})

export default api
