sinon = require 'sinon'
should = require 'should'
require 'should-sinon'
xlsReader = require '../src/xls-reader'
xlsx = require 'xlsx'

describe 'xlsReader', ->
  beforeEach ->
    @sandbox = sinon.sandbox.create()
    @readFileStub = @sandbox.stub(xlsx, 'readFile').returns
      SheetNames: ['fakeName']
      Sheets: fakeName: 'fake worksheet'
    @sheetToJsonStub = @sandbox.stub xlsx.utils, 'sheet_to_json'
    @fakeHeaders = ['fake', 'header']

  afterEach ->
    @sandbox.restore()

  describe 'toJson', ->
    it 'should return an error if there was an error when converting file', ->
      @sheetToJsonStub.throws new Error 'json convert error'
      (->
        xlsReader.toJson 'fakePath'
      ).should.throw 'json convert error'

    it 'should return a json object if all went well', ->
      @sheetToJsonStub.returns 'json-object-test'
      fakeHeaders = ['fake', 'header']
      xlsReader.toJson('fakePath', fakeHeaders).should.equal 'json-object-test'
      @readFileStub.should.have.been.calledWithExactly 'fakePath'
      xlsx.utils.sheet_to_json.should.have.been.calledWithExactly 'fake worksheet', header: fakeHeaders
