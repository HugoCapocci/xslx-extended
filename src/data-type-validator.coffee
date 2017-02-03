_ = require 'lodash'
moment = require 'moment'

validateInteger = (value) ->
  if typeof value is 'string' and /^(\-|\+)?[0-9]+$/.test value
    return isFinite Number value
  typeof value is 'number' and
  isFinite(value) and
  Math.floor(value) is value

validateDate = (value) ->
  moment(value, 'MM/DD/YY', true).isValid()

validateDouble = (value) ->
  if /^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test value
    return isFinite Number value
  false

validateBoolean = (value) ->
  typeof value is 'boolean' or value in ['true', 'false', 'TRUE', 'FALSE']

validateEnum = (value, enumeration) ->
  throw new Error 'Enum is not an array' unless _.isArray enumeration
  value in enumeration

module.exports =
  validateInteger: validateInteger
  validateDouble: validateDouble
  validateDate: validateDate
  validateBoolean: validateBoolean
  validateEnum: validateEnum
