import { Line } from '../src/Line.mjs';
import { TableNameLine } from '../src/TableNameLine.mjs';
import {assert, assertEq} from './testlib.mjs';
export default {
  'tableNameLine': () => {
    var input = 'CREATE TABLE table_name(';
    var act = new TableNameLine(new Line(input, 0));
    assert(act.getTableName() == 'table_name', 'テーブル名')
  },
  'tableNameLine キーワードが小文字': () => {
    var input = 'create table table_name(';
    var act = new TableNameLine(new Line(input, 0));
    assert(act.getTableName() == 'table_name', 'テーブル名')
  },
  'tableNameLine カッコがない': () => {
    var input = 'CREATE TABLE table_name';
    var act = new TableNameLine(new Line(input, 0));
    assertEq(act.getTableName(), 'table_name', 'テーブル名')
  },
}