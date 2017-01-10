moment = require 'moment'
should = require 'should'
xlsWriter = require '../src/xls-writer'
xlsx = require 'xlsx'

describe 'xlsWriter', ->

  describe 'bufferFromJson', ->

    it 'should return buffer of an excel file content', ->
      matrixValues = [
        ['dummyValue', moment.utc('2016-12-05', 'YYYY-MM-DD').toDate(), 42, 0]
      ]
      buffer = xlsWriter.bufferFromJson 'dummySheet', matrixValues
      workbook = xlsx.read buffer, type: 'buffer'
      workbook.SheetNames.should.deepEqual ['dummySheet']

      worksheet = workbook.Sheets['dummySheet']
      worksheet['A1'].v.should.equal 'dummyValue'
      worksheet['B1'].w.should.equal '12/5/16'
      worksheet['C1'].v.should.equal 42
      worksheet['D1'].v.should.equal 0
