import { Line } from '../src/Line.mjs';
import { ColumnLine } from '../src/ColumnLine.mjs';
import { Constraints } from '../src/ConstraintLine.mjs';
import {assert, assertEq} from './testlib.mjs';

var constraints = new Constraints({'column_pk': true}, {'column_uq': true})
export default {
  'column': () => {
    var input = 'column VARCHAR2(13)';
    var act = new ColumnLine(new Line(input, 1)).parse(constraints);
    assertEq(act.columnName, 'column');
    assertEq(act.type, 'VARCHAR2(13)');
    assert(!act.isNotNull);
    assert(!act.isPk);
    assert(!act.isUnique);
  },
  'column not null': () => {
    var input = 'column VARCHAR2(13) NOT NULL,';
    var act = new ColumnLine(new Line(input, 1)).parse(constraints);
    assertEq(act.columnName, 'column');
    assertEq(act.type, 'VARCHAR2(13)');
    assert(act.isNotNull);
    assert(!act.isPk);
    assert(!act.isUnique);
  },
  'column pk': () => {
    var input = 'column_pk VARCHAR2(13)';
    var act = new ColumnLine(new Line(input, 1)).parse(constraints);
    assert(act.isPk);
    assert(!act.isUnique);
  },
  'column uq': () => {
    var input = 'column_uq VARCHAR2(13)';
    var act = new ColumnLine(new Line(input, 1)).parse(constraints);
    assert(!act.isPk);
    assert(act.isUnique);
  },
}