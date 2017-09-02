"use strict";

const sinon = require('sinon');
const should = require('should');
require('should-sinon');
const xlsReader = require('../src/xls-reader');
const xlsx = require('xlsx');

describe('xlsReader', function() {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    this.readFileStub = this.sandbox.stub(xlsx, 'readFile').returns({
      SheetNames: ['fakeName'],
      Sheets: { fakeName: 'fake worksheet'
    }
    });
    this.sheetToJsonStub = this.sandbox.stub(xlsx.utils, 'sheet_to_json');
    this.fakeHeaders = ['fake', 'header'];});

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('toJson', function() {
    it('should return an error if there was an error when converting file', function() {
      this.sheetToJsonStub.throws(new Error('json convert error'));
      (() => xlsReader.toJson('fakePath')).should.throw('json convert error');
    });

    it('should return a json object if all went well', function() {
      this.sheetToJsonStub.returns('json-object-test');
      const fakeHeaders = ['fake', 'header'];
      xlsReader.toJson('fakePath', fakeHeaders).should.equal('json-object-test');
      this.readFileStub.should.have.been.calledWithExactly('fakePath');
      xlsx.utils.sheet_to_json.should.have.been.calledWithExactly('fake worksheet', {header: fakeHeaders});
    });
  });
});
