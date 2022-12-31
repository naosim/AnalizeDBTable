import {Line} from './Line.mjs'
import {Constraints} from './ConstraintLine.mjs'

export class ColumnLine {
  /**
   * 
   * @param {Line} line 
   */
  constructor(line) {
    this.line = line;
  }

  parse(/** @type {Constraints}*/constraints) {
    var v = this.line.value;
    /** @type {string} */
    const columnName = v.split(' ')[0];
    const isPk = constraints.isPk(columnName);
    const isUnique = constraints.isUnique(columnName);
    /** @type {string} */
    const type = v.split(' ').filter(v => v.trim().length > 0)[1].split(',')[0];
    const isNotNull = v.indexOf('NOT NULL') != -1;
    const comment = this.line.comment;
    return {columnName, isPk, isUnique, type, isNotNull, comment}
  }

}