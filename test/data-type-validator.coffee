dataTypeValidator =  require '../src/data-type-validator'

using = (values, func) ->
  for i in [0..values.length - 1]
    if Object.prototype.toString.call(values[i]) isnt '[object Array]'
      values[i] = [values[i], i]
    func.apply @, values[i]
  return

describe 'dataTypeValidator', ->
  describe 'validateInteger', ->
    using [
      {value: null, expectedCheck: false}
      {value: 'dfdfd', expectedCheck: false}
      {value: '1.3343', expectedCheck: false}
      {value: '32d3', expectedCheck: false}
      {value: '', expectedCheck: false}
      {value: '-', expectedCheck: false}
      {value: '12-12', expectedCheck: false}
      {value: '3', expectedCheck: true}
      {value: '-123', expectedCheck: true}
      {value: 123, expectedCheck: true}
      {value: -123, expectedCheck: true}
    ], ({value, expectedCheck}) ->
      it 'should check if value is an integer', ->
        dataTypeValidator.validateInteger(value).should.equal expectedCheck

  describe 'validateDouble', ->
    using [
      {value: 'dfdfd', expectedCheck: false}
      {value: '32d3', expectedCheck: false}
      {value: '-', expectedCheck: false}
      {value: '12-12', expectedCheck: false}
      {value: '12.-12', expectedCheck: false}
      {value: undefined, expectedCheck: false}
      {value: '', expectedCheck: false}
      {value: null, expectedCheck: false}
      {value: '-121.3343', expectedCheck: true}
      {value: '1.3343', expectedCheck: true}
      {value: '3', expectedCheck: true}
      {value: '-123', expectedCheck: true}
      {value: 123.12, expectedCheck: true}
      {value: -123.12, expectedCheck: true}
    ], ({value, expectedCheck}) ->
      it 'should check if value is an double', ->
        dataTypeValidator.validateDouble(value).should.equal expectedCheck

  describe 'validateDate', ->
    using [
      {value: 'notadate', expectedCheck: false}
      {value: '1234', expectedCheck: false}
      {value: '03/20', expectedCheck: false}
      {value: '12-12', expectedCheck: false}
      {value: '2015-11-12', expectedCheck: false}
      {value: '', expectedCheck: false}
      {value: undefined, expectedCheck: false}
      {value: '12/12/15', expectedCheck: true}
      {value: '12/31/15', expectedCheck: true}
      {value: '01/01/15', expectedCheck: true}
    ], ({value, expectedCheck}) ->
      it 'should check if value is a date', ->
        dataTypeValidator.validateDate(value).should.equal expectedCheck

  describe 'validateBoolean', ->
    using [
      {value: '', expectedCheck: false}
      {value: 'zkjeh', expectedCheck: false}
      {value: -367, expectedCheck: false}
      {value: 'true', expectedCheck: true}
      {value: 'false', expectedCheck: true}
      {value: true, expectedCheck: true}
      {value: false, expectedCheck: true}
      {value: undefined, expectedCheck: false}
      {value: 1, expectedCheck: false}
    ], ({value, expectedCheck}) ->
      it 'should check if value is a boolean', ->
        dataTypeValidator.validateBoolean(value).should.equal expectedCheck

  describe 'validateEnum', ->
    using [
      {value: '', expectedCheck: false}
      {value: null, expectedCheck: false}
      {value: 'notInRef', expectedCheck: false}
      {value: 'ref1', expectedCheck: true}
      {value: 'ref3', expectedCheck: true}
    ], ({value, expectedCheck}) ->
      it 'should return false if value is in the enum', ->
        enumeration = ['ref1', 'ref2', 'ref3']
        dataTypeValidator.validateEnum(value, enumeration).should.equal expectedCheck

    it 'should throw exception if enum is not an array', ->
      (->
        dataTypeValidator.validateEnum 'fakeValue', not: 'anArray'
      ).should.throw 'Enum is not an array'
