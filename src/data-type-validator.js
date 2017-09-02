"use strict";

const _ = require('lodash');
const moment = require('moment');

const validateInteger = function(value) {
  if ((typeof value === 'string') && /^(\-|\+)?[0-9]+$/.test(value)) {
    return isFinite(Number(value));
  }
  return (typeof value === 'number') &&
  isFinite(value) &&
  (Math.floor(value) === value);
};

const validateDate = value => moment(value, 'MM/DD/YY', true).isValid();

const validateDouble = function(value) {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test(value)) {
    return isFinite(Number(value));
  }
  return false;
};

const validateBoolean = value => (typeof value === 'boolean') || ['true', 'false', 'TRUE', 'FALSE'].includes(value);

const validateEnum = function(value, enumeration) {
  if (!_.isArray(enumeration)) { throw new Error('Enum is not an array'); }
  return Array.from(enumeration).includes(value);
};

module.exports = {
  validateInteger,
  validateDouble,
  validateDate,
  validateBoolean,
  validateEnum
};
