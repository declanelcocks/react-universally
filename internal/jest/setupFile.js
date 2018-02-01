/* eslint import/first: "off" */
import '../../shared/polyfills'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

global.api = {
  post: () => {},
  get: () => {},
  put: () => {},
  delete: () => {},
  setToken: () => {},
  unsetToken: () => {},
}

const mockResponse = (status, statusText, response) =>
  new window.Response(JSON.stringify(response), {
    status,
    statusText,
    headers: {
      'Content-type': 'application/json',
    },
  })

global.mockFetch = (status, statusText, response) => {
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(mockResponse(status, statusText, response)),
    )
}
