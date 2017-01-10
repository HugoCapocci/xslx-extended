xlsx = require 'xlsx'

datenum = (v) ->
  epoch = Date.parse v
  (epoch - new Date Date.UTC(1899, 11, 30) ) / (24 * 60 * 60 * 1000)

checkCellType = (cell) ->
  if (typeof cell.v) is 'number' then cell.t = 'n'
  else if (typeof cell.v) is 'boolean' then cell.t = 'b'
  else if cell.v instanceof Date
    cell.t = 'n'
    cell.z = xlsx.SSF._table[14]
    cell.v = datenum cell.v
  else
    cell.t = 's'

checkRange = (range, r, c) ->
  range.s.r = r if range.s.r > r
  range.s.c = c if range.s.c > c
  range.e.r = r if range.e.r < r
  range.e.c = c if range.e.c < c

class Workbook
  constructor: (@SheetNames) ->
    @Sheets = {}

  setCellValuesForSheet: (sheetName, matrixValues) ->
    range = s: {c: 0, r: 0}, e: {c: 0, r: 0}
    sheet = {}

    for r in [0..matrixValues.length - 1]
      row = matrixValues[r]
      for c in [0..row.length - 1]
        checkRange range, r, c
        cell = v: if row[c]? then row[c] else ''
        cellRef = xlsx.utils.encode_cell c: c, r: r
        checkCellType cell
        sheet[cellRef] = cell

    if range.s.c < 10000000
      sheet['!ref'] = xlsx.utils.encode_range range
    @Sheets[sheetName] = sheet

bufferFromJson = (sheetName, values) ->
  options = bookType: 'xlsx', bookSST: false, type: 'buffer'
  workBook = new Workbook [sheetName]
  workBook.setCellValuesForSheet sheetName, values

  xlsx.write workBook, options

module.exports =
  bufferFromJson: bufferFromJson
