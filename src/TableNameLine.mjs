import {Line} from './Line.mjs'

export class TableNameLine {
  /**
   * 
   * @param {Line} line 
   */
  constructor(line) {
    this.line = line;
  }
  getTableName() {
    return this.line.lowerCaseValue.split('create table')[1].split('(')[0].trim();
  }
  getTableNameComment() {
    return this.line.comment;
  }
}