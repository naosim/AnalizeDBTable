import {Line} from './Line.mjs'
import {TableNameLine} from './TableNameLine.mjs'
import {ConstraintLine, Constraints} from './ConstraintLine.mjs'
import {ColumnLine} from './ColumnLine.mjs'


export function parseBody(body) {
  const lines = body.trim().split('\n').map((v, i) => Line.createLine(v, i)).filter(v => !v.isSkipLine());
  var tableName, tableNameComment;
  var columns = [];
  var constraints = Constraints.empty();
  lines.forEach((line, n) => {
    if(line.isFirstLine()) { // 最初の行はテーブル名
      var tableNameLine = new TableNameLine(line);
      tableName = tableNameLine.getTableName();
      //console.log(tableName)
      tableNameComment = tableNameLine.getTableNameComment();
    } else if(ConstraintLine.isConstraintLine(line)) { // プライマリーキー
      constraints = new ConstraintLine(line).parse();
    } else {
      columns.push(new ColumnLine(line));
    }
  })

  // カラムの解析
  columns = columns.map(v => v.parse(constraints))
  return {tableName, tableNameComment, columns};
}

export class AnalyzeDBTableService {
  constructor(
    execAndEachLine,
    readFileSync
  ) {
    this.execAndEachLine = execAndEachLine;
    this.readFileSync = readFileSync;
  }
  analyzeDBTableScript(file) { 
    var body = this.readFileSync(file, 'utf8').trim();
    //console.log(body)
    return {file: file, table: parseBody(body)}; // とりあえずそのまま返す
  }

  analyzeDBTable(basePath, cb) {
    this.execAndEachLine(
      'find ' + basePath + ' | grep .sql',
      (files) => {
        var data = files
          .map(v => this.analyzeDBTableScript(v))
          .map(v => {
            // ファイルパスをbasePathからのパスにする これをすべきかは結構迷った
            var file = v.file.split(basePath + '/')[1];
            return {
              file: file,
              table: v.table
            }
          });
        cb(data);
      }
    )
  }
}