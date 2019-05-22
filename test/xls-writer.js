"use strict";

const moment = require('moment');
const should = require('should');
const xlsWriter = require('../src/xls-writer');
const xlsx = require('xlsx');

describe('xlsWriter', () => {
  describe('bufferFromJson', () => {
    it('should return buffer of an excel file content', () => {
      const matrixValues = [
        [
          'dummyValue',
          moment.utc('2016-12-05', 'YYYY-MM-DD').toDate(),
          42,
          0,
          false
        ]
      ];
      const buffer = xlsWriter.bufferFromJson('dummySheet', matrixValues);
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      workbook.SheetNames.should.deepEqual(['dummySheet']);

      const worksheet = workbook.Sheets['dummySheet'];
      worksheet['A1'].v.should.equal('dummyValue');
      worksheet['A1'].t.should.equal('s');

      worksheet['B1'].w.should.equal('12/5/16');
      worksheet['B1'].t.should.equal('n');

      worksheet['C1'].v.should.equal(42);
      worksheet['C1'].t.should.equal('n');
      worksheet['D1'].v.should.equal(0);
      worksheet['D1'].t.should.equal('n');

      worksheet['E1'].v.should.equal(false);
      worksheet['E1'].t.should.equal('b');
    });
  });

  describe('bufferFromMultiValues', () => {
    it('should return buffer of an excel file content', () => {
      const matrixValues1 = [[]];
      const matrixValues2 = [
        [
          'dummyValue2',
          moment.utc('2016-12-05', 'YYYY-MM-DD').toDate(),
          42,
          0,
          false
        ]
      ];
      const buffer = xlsWriter.bufferFromMultiValues({
        sheet1: matrixValues1,
        sheet2: matrixValues2
      });
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      workbook.SheetNames.should.deepEqual(['sheet1', 'sheet2']);

      const worksheet = workbook.Sheets['sheet2'];
      worksheet['A1'].v.should.equal('dummyValue2');
      worksheet['A1'].t.should.equal('s');

      worksheet['B1'].w.should.equal('12/5/16');
      worksheet['B1'].t.should.equal('n');

      worksheet['C1'].v.should.equal(42);
      worksheet['C1'].t.should.equal('n');
      worksheet['D1'].v.should.equal(0);
      worksheet['D1'].t.should.equal('n');

      worksheet['E1'].v.should.equal(false);
      worksheet['E1'].t.should.equal('b');
    });
  });
});
