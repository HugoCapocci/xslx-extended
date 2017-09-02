"use strict";

const should = require('should');
const dataTypeValidator =  require('../src/data-type-validator');

const using = function(values, func) {
  for (let i = 0, end = values.length - 1, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
    if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
      values[i] = [values[i], i];
    }
    func.apply(this, values[i]);
  }
};

describe('dataTypeValidator', function() {
  describe('validateInteger', () =>
    using([
      {value: null, expectedCheck: false},
      {value: 'dfdfd', expectedCheck: false},
      {value: '1.3343', expectedCheck: false},
      {value: '32d3', expectedCheck: false},
      {value: '', expectedCheck: false},
      {value: '-', expectedCheck: false},
      {value: '12-12', expectedCheck: false},
      {value: '3', expectedCheck: true},
      {value: '-123', expectedCheck: true},
      {value: 123, expectedCheck: true},
      {value: -123, expectedCheck: true}
    ], ({value, expectedCheck}) =>
      it('should check if value is an integer', () => dataTypeValidator.validateInteger(value).should.equal(expectedCheck))
    )
  );

  describe('validateDouble', () =>
    using([
      {value: 'dfdfd', expectedCheck: false},
      {value: '32d3', expectedCheck: false},
      {value: '-', expectedCheck: false},
      {value: '12-12', expectedCheck: false},
      {value: '12.-12', expectedCheck: false},
      {value: undefined, expectedCheck: false},
      {value: '', expectedCheck: false},
      {value: null, expectedCheck: false},
      {value: '-121.3343', expectedCheck: true},
      {value: '1.3343', expectedCheck: true},
      {value: '3', expectedCheck: true},
      {value: '-123', expectedCheck: true},
      {value: 123.12, expectedCheck: true},
      {value: -123.12, expectedCheck: true}
    ], ({value, expectedCheck}) =>
      it('should check if value is a double', () => dataTypeValidator.validateDouble(value).should.equal(expectedCheck))
    )
  );

  describe('validateDate', () =>
    using([
      {value: 'notadate', expectedCheck: false},
      {value: '1234', expectedCheck: false},
      {value: '03/20', expectedCheck: false},
      {value: '12-12', expectedCheck: false},
      {value: '2015-11-12', expectedCheck: false},
      {value: '', expectedCheck: false},
      {value: undefined, expectedCheck: false},
      {value: '12/12/15', expectedCheck: true},
      {value: '12/31/15', expectedCheck: true},
      {value: '01/01/15', expectedCheck: true}
    ], ({value, expectedCheck}) =>
      it('should check if value is a date', () => dataTypeValidator.validateDate(value).should.equal(expectedCheck))
    )
  );

  describe('validateBoolean', () =>
    using([
      {value: '', expectedCheck: false},
      {value: 'zkjeh', expectedCheck: false},
      {value: -367, expectedCheck: false},
      {value: 'true', expectedCheck: true},
      {value: 'false', expectedCheck: true},
      {value: true, expectedCheck: true},
      {value: false, expectedCheck: true},
      {value: undefined, expectedCheck: false},
      {value: 1, expectedCheck: false}
    ], ({value, expectedCheck}) =>
      it('should check if value is a boolean', () => dataTypeValidator.validateBoolean(value).should.equal(expectedCheck))
    )
  );

  return describe('validateEnum', function() {
    using([
      {value: '', expectedCheck: false},
      {value: null, expectedCheck: false},
      {value: 'notInRef', expectedCheck: false},
      {value: 'ref1', expectedCheck: true},
      {value: 'ref3', expectedCheck: true}
    ], ({value, expectedCheck}) =>
      it('should check if value is in the enum', function() {
        const enumeration = ['ref1', 'ref2', 'ref3'];
        return dataTypeValidator.validateEnum(value, enumeration).should.equal(expectedCheck);
      })
    );

    return it('should throw exception if enum is not an array', () =>
      (() => dataTypeValidator.validateEnum('fakeValue', {not: 'anArray'})).should.throw('Enum is not an array')
    );
  });
});
