import assert from 'assert';
import {parseBody} from '../src/AnalyzeDBTableService.mjs'

main()
async function main () {
  try {
    var tests = getTests();
    Object.keys(tests).forEach(async k => {
      try {
        await tests[k]()
        console.info(`OK ${k}`) // <4>
      } catch (err) {
        console.info(`NG ${k}`) // <5>
        console.error(err)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

function getTests() {
  return {
    parseBody: () => {
    var input = `
CREATE TABLE table_name ( /* テーブル名のコメント */
  column1_pk VARCHAR2(13) NOT NULL,
  column2 VARCHAR2(20), /* カラム2コメント */
  column3_date DATE NOT NULL
  CONSTRAINT pk_column1 PRIMARY KEY(column1_pk)
)`.trim();
    var act = parseBody(input);
    assert(act.tableName == 'table_name');
    assert(act.columns.length == 3);
    assert(act.columns[0].columnName == 'column1_pk');
    assert(act.columns[0].isPk);
    },

    // 'parseConstraintLine 複数PK': () => {
    //   var input = 'CONSTRAINT pk_column1 PRIMARY KEY(column1_pk, column2_pk)';
    //   var act = parseConstraintLine(input);
    //   assert(!!act.pkMap.column1_pk);
    //   assert(!!act.pkMap.column2_pk);
    // },
    // 'parseConstraintLine 複数UNIQUE': () => {
    //   var input = 'CONSTRAINT pk_column1 UNIQUE(column1_pk, column2_pk)';
    //   var act = parseConstraintLine(input);
    //   assert(!!act.uniqueMap.column1_pk);
    //   assert(!!act.uniqueMap.column2_pk);
    // },
    // 'parseConstraintLine pk': () => {
    //   var input = 'CONSTRAINT pk_column1 UNIQUE (column1_pk)';
    //   var act = parseConstraintLine(input);
    //   assert(!!act.uniqueMap.column1_pk);
    // },




  }
}