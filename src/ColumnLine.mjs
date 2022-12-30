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

  /**
   * 
   * @param {Constraints} constraints 
   * @returns 
   */
  parse(constraints) {
    var v = this.line.value;
    //console.log(v)
    const columnName = v.split(' ')[0];
    const isPk = constraints.isPk(columnName);
    const isUnique = constraints.isUnique(columnName);
    const type = v.split(' ').filter(v => v.trim().length > 0)[1].split(',')[0];
    const isNotNull = v.indexOf('NOT NULL') != -1;
    const comment = this.line.getComment(v);
    return {columnName, isPk, isUnique, type, isNotNull, comment}
  }

}