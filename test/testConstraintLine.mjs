import { Line } from '../src/Line.mjs';
import { ConstraintLine, Constraints } from '../src/ConstraintLine.mjs';
import {assert, assertEq} from './testlib.mjs';

export default {
  'constraint pk': () => {
    var input = 'CONSTRAINT pk_column1 PRIMARY KEY(column1_pk)';
    var act = new ConstraintLine(new Line(input, 2)).parse();
    assert(act.isPk('column1_pk'))
    assert(!act.isPk('hoge'))
  },
  'constraint pk 小文字': () => {
    var input = 'constraint pk_column1 primary key(column1_pk)';
    var act = new ConstraintLine(new Line(input, 2)).parse();
    assert(act.isPk('column1_pk'))
    assert(!act.isPk('hoge'))
  },
  'constraint pk複数': () => {
    var input = 'CONSTRAINT pk_column1 PRIMARY KEY(column1_pk, column2_pk)';
    var act = new ConstraintLine(new Line(input, 2)).parse();
    assert(act.isPk('column1_pk'))
    assert(act.isPk('column2_pk'))
    assert(!act.isPk('hoge'))
  },
  'constraint uq': () => {
    var input = 'CONSTRAINT pk_column1 UNIQUE(column1_uq)';
    var act = new ConstraintLine(new Line(input, 2)).parse();
    assert(act.isUnique('column1_uq'))
    assert(!act.isUnique('hoge'))
  },
  'constraint uq複数': () => {
    var input = 'CONSTRAINT pk_column1 UNIQUE(column1_uq, column2_uq)';
    var act = new ConstraintLine(new Line(input, 2)).parse();
    assert(act.isUnique('column1_uq'))
    assert(act.isUnique('column2_uq'))
    assert(!act.isUnique('hoge'))
  },
  
}