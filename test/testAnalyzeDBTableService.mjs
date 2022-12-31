import {assert, assertEq} from './testlib.mjs';
import {parseBody} from '../src/AnalyzeDBTableService.mjs'

export default {
  parseBody: () => {
    var input = `
CREATE TABLE table_name ( /* テーブル名のコメント */
  column1_pk VARCHAR2(13) NOT NULL,
  column2 VARCHAR2(20), /* カラム2コメント */
  column3_date DATE NOT NULL
  CONSTRAINT pk_column1 PRIMARY KEY(column1_pk)
)`.trim();
    var act = parseBody(input);
    assertEq(act.tableName, 'table_name');
    assertEq(act.tableNameComment, 'テーブル名のコメント');
    assertEq(act.columns.length, 3);
    assertEq(act.columns[0].columnName, 'column1_pk');
    assert(act.columns[0].isPk);
    },
}