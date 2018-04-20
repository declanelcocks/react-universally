import moment from 'moment'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'

const VALIDATION_FIELD_REQUIRED = 'Required'

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const notRequired = () => {
  return undefined
}

const agreed = value =>
  !!value === false ? VALIDATION_FIELD_REQUIRED : undefined

const required = value => {
  if (isBoolean(value)) return undefined
  if (typeof value === 'number' && value) return undefined
  return isEmpty(value) ? VALIDATION_FIELD_REQUIRED : undefined
}

const maxLength = max => value => {
  return !isEmpty(value) && value.length > max
    ? `Must be no more than ${max} characters`
    : undefined
}

const maxLength255 = maxLength(255)

const email = value => {
  const re = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(value) ? undefined : 'Please enter a valid email'
}

const password = value => {
  if (isEmpty(value)) return VALIDATION_FIELD_REQUIRED
  if (value.length < 7) return 'Your password is too short'
  return undefined
}

const url = value => {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  return re.test(value) ? undefined : 'Please enter valid URL'
}

const select = value => {
  if (value instanceof Array) {
    return isEmpty(value) ? VALIDATION_FIELD_REQUIRED : undefined
  }
  return typeof value === 'number' ? undefined : VALIDATION_FIELD_REQUIRED
}

const date = value => {
  if (!moment(value).isValid()) return 'Please enter a valid date (DD/MM/YYYY)'
  return undefined
}

export {
  composeValidators,
  notRequired,
  required,
  email,
  password,
  url,
  select,
  date,
  maxLength255,
  agreed,
}
