/* eslint import/first: "off" */
import '../../shared/polyfills'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const createMockResponse = (status, statusText, response) =>
  new window.Response(JSON.stringify(response), {
    status,
    statusText,
    headers: {
      'Content-type': 'application/json',
    },
  })

/**
 * Provide a function with our test suit to allow us to mock
 * client API calls.
 *
 * Example: createMockFetch(401, 'Unauthorized', {...})
 *
 * This will then replace the native `fetch` with our mocked
 * function.
 */
global.createMockFetch = (status, statusText, response) => {
  window.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(createMockResponse(status, statusText, response)),
    )
}
