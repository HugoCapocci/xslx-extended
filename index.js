var reader = require('./lib/xls-reader');
var writer = require('./lib/xls-writer');

var getContentDisposition = function(fileName) {
  return 'attachment; filename=' + fileName +' .xlsx';
}

module.exports = {
  bufferFromJson: writer.bufferFromJson,
  toJson: reader.toJson,
  getContentDisposition: getContentDisposition,
  CONTENT_TYPE: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}
