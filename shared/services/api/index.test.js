import toUpper from 'lodash/toUpper'
import api, { checkStatus, parseJSON, parseSettings, parseEndpoint } from '.'
import config from '../../../config'

const endpoint = url => `${config('apiUrl')}${url}`

describe('checkStatus', () => {
  it('returns response when it is ok', () => {
    const response = { ok: true }

    expect(checkStatus(response)).resolves.toBe(response)
  })

  it('throws an Error with a message when it is not ok', () => {
    const response = {
      ok: false,
      json: () => new Promise(resolve => resolve({ ok: false })),
    }

    return expect(checkStatus(response)).rejects.toThrowError(
      expect.objectContaining({
        message: expect.any(String),
      }),
    )
  })

  it('throws an Error with the API status when a message does not exist', () => {
    const response = {
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: () => new Promise(resolve => resolve({ ok: false })),
    }

    return expect(checkStatus(response)).rejects.toThrowError(
      /^401 Unauthorized$/gm,
    )
  })

  it('throws an Error with the API message when it exists', () => {
    const response = {
      ok: false,
      json: () =>
        new Promise(resolve => resolve({ ok: false, message: 'error msg' })),
    }

    return expect(checkStatus(response)).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining('error msg'),
      }),
    )
  })

  it('throws an Error with the API status when the response cannot be parsed as JSON', () => {
    const response = {
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: () => new Promise((resolve, reject) => reject()),
    }

    return expect(checkStatus(response)).rejects.toThrowError(
      /^401 Unauthorized$/gm,
    )
  })
})

describe('parseJSON', () => {
  it('calls response.json', () => {
    const response = {
      json: jest.fn(() => 'foo'),
    }

    expect(parseJSON(response)).toBe('foo')
  })
})

describe('parseSettings', () => {
  it('has method get by default', () => {
    expect(parseSettings().method).toBe('GET')
  })

  it('has normal body', () => {
    expect(parseSettings({ body: 'foo' }).body).toBe('foo')
  })

  it('has data body', () => {
    expect(parseSettings({ data: { foo: 'bar' } }).body).toBe(
      JSON.stringify({ foo: 'bar' }),
    )
  })

  it('has passed method', () => {
    expect(parseSettings({ method: 'post' }).method).toBe('POST')
  })

  it('merges headers', () => {
    const otherSettings = { headers: { foo: 'bar' } }
    const settings = parseSettings(otherSettings)

    expect(settings).toHaveProperty('headers.foo', 'bar')
    expect(Object.keys(settings.headers).length).toBeGreaterThan(
      Object.keys(otherSettings.headers).length,
    )
  })
})

describe('parseEndpoint', () => {
  it('appends endpoint to apiUrl', () => {
    expect(parseEndpoint('/foo')).toBe(endpoint('/foo'))
  })

  it('parses params', () => {
    expect(parseEndpoint('/foo', { bar: 'baz' })).toBe(endpoint('/foo?bar=baz'))
  })

  it('parses url other than apiUrl', () => {
    expect(parseEndpoint('https://foo.bar/baz')).toBe('https://foo.bar/baz')
  })
})

describe('api', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: jest.fn(),
      }),
    )
  })

  test('request', () => {
    expect(global.fetch).not.toBeCalled()

    api.request('/foo').then(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        endpoint('/foo'),
        expect.objectContaining({
          method: 'GET',
        }),
      )
    })
  })
  ;['delete', 'get', 'post', 'put', 'patch'].forEach(method => {
    test(method, () => {
      expect(global.fetch).not.toBeCalled()

      api[method]('/foo').then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          endpoint('/foo'),
          expect.objectContaining({ method: toUpper(method) }),
        )
      })
    })
  })

  describe('create', () => {
    beforeEach(() => {
      api.request = jest.fn()
    })

    it('creates without arguments', () => {
      api.create()
    })

    it('has settings', () => {
      expect(api.create({ foo: 'bar' }).settings).toEqual({ foo: 'bar' })
    })

    test('setToken', () => {
      const obj = api.create({ headers: { foo: 'bar' } })

      obj.setToken('token')
      expect(obj.settings).toEqual({
        headers: {
          foo: 'bar',
          Authorization: 'Bearer token',
        },
      })
    })

    test('unsetToken', () => {
      const obj = api.create({
        headers: {
          foo: 'bar',
          Authorization: 'Bearer token',
        },
      })

      obj.unsetToken()
      expect(obj.settings).toEqual({ headers: { foo: 'bar' } })
    })

    test('request', () => {
      const obj = api.create({ foo: 'bar' })

      expect(api.request).not.toBeCalled()
      obj.request('/foo', { baz: 'qux' })
      expect(api.request).toHaveBeenCalledWith('/foo', {
        foo: 'bar',
        baz: 'qux',
      })
    })
    ;['get', 'delete'].forEach(method => {
      test(method, () => {
        const obj = api.create({ foo: 'bar' })

        expect(api.request).not.toBeCalled()
        obj[method]('/foo', { baz: 'qux' })
        expect(api.request).toHaveBeenCalledWith('/foo', {
          foo: 'bar',
          baz: 'qux',
          method,
        })
      })
    })
    ;['post', 'put', 'patch'].forEach(method => {
      test(method, () => {
        const obj = api.create({ foo: 'bar' })

        expect(api.request).not.toBeCalled()
        obj[method]('/foo', { field: 'value' }, { baz: 'qux' })
        expect(api.request).toHaveBeenCalledWith('/foo', {
          foo: 'bar',
          baz: 'qux',
          data: {
            field: 'value',
          },
          method,
        })
      })
    })
  })
})
