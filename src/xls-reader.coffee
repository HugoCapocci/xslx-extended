xlsx = require 'xlsx'

toJson = (filePath, headers) ->
  workbook = xlsx.readFile filePath
  worksheetName = workbook.SheetNames[0]
  worksheet = workbook.Sheets[worksheetName]
  xlsx.utils.sheet_to_json worksheet, header: headers

module.exports =
  toJson: toJson
