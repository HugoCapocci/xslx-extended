"use strict";

const xlsx = require('xlsx');

const toJson = function(filePath, headers) {
  const workbook = xlsx.readFile(filePath);
  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];
  return xlsx.utils.sheet_to_json(worksheet, {header: headers});
};

module.exports = {
  toJson
};
