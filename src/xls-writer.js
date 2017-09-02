"use strict";

const xlsx = require('xlsx');

const datenum = function(v) {
  const epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30)) ) / (24 * 60 * 60 * 1000);
};

const checkCellType = function(cell) {
  if ((typeof cell.v) === 'number') {
    cell.t = 'n';
  } else if ((typeof cell.v) === 'boolean') {
    cell.t = 'b';
  } else if (cell.v instanceof Date) {
    cell.t = 'n';
    cell.z = xlsx.SSF._table[14];
    cell.v = datenum(cell.v);
  } else {
    cell.t = 's';
  }
};

const checkRange = function(range, r, c) {
  if (range.s.r > r) { range.s.r = r; }
  if (range.s.c > c) { range.s.c = c; }
  if (range.e.r < r) { range.e.r = r; }
  if (range.e.c < c) { range.e.c = c; }
};

class Workbook {
  constructor(SheetNames) {
    this.SheetNames = SheetNames;
    this.Sheets = {};
  }

  setCellValuesForSheet(sheetName, matrixValues) {
    let c;
    const range = {
      s: {c: 0, r: 0},
      e: {c: 0, r: 0}
    };
    const sheet = {};

    for (let r = 0, end = matrixValues.length - 1, asc = 0 <= end; asc ? r <= end : r >= end; asc ? r++ : r--) {
      var asc1, end1;
      const row = matrixValues[r];
      for (c = 0, end1 = row.length - 1, asc1 = 0 <= end1; asc1 ? c <= end1 : c >= end1; asc1 ? c++ : c--) {
        checkRange(range, r, c);
        const cell = {v: (row[c] != null) ? row[c] : ''};
        const cellRef = xlsx.utils.encode_cell({c, r});
        checkCellType(cell);
        sheet[cellRef] = cell;
      }
    }

    if (range.s.c < 10000000) {
      sheet['!ref'] = xlsx.utils.encode_range(range);
    }
    this.Sheets[sheetName] = sheet;
  }
}

const bufferFromJson = function(sheetName, values) {
  const options = { bookType: 'xlsx', bookSST: false, type: 'buffer' };
  const workBook = new Workbook([sheetName]);
  workBook.setCellValuesForSheet(sheetName, values);

  return xlsx.write(workBook, options);
};

module.exports = {
  bufferFromJson
};
