import {Line} from './Line.mjs'

export class ConstraintLine {
  /**
   * 
   * @param {Line} line 
   */
  constructor(line) {
    this.line = line;
  }

  /**
   * 
   * @param {string} keyword 
   * @returns 
   */
  getArgs(keyword) {
    keyword = keyword.toLowerCase();
    return this.line.lowerCaseValue.split(keyword)[1].split('(')[1].split(')')[0].split(',').map(v => v.trim());
  }

  parse() {
    var line = this.line.value;
    if(!ConstraintLine.isConstraintLine(this.line)) {
      throw new Error('CONSTRAINTでない');
    }
    var pkMap = {};
    var uniqueMap = {};
    if(this.line.contains('PRIMARY KEY')) {
      pkMap = this.getArgs('PRIMARY KEY').reduce((memo, v) => {memo[v] = v; return memo}, {});
    } else if(this.line.contains('UNIQUE')) {
      uniqueMap = this.getArgs('UNIQUE').reduce((memo, v) => {memo[v] = v; return memo}, {});
    } else {
      throw new Error('CONSTRAINT keyword not found:' + line);
    }
    return new Constraints(pkMap, uniqueMap);
  }

  /**
   * 
   * @param {Line} line 
   * @returns {boolean}
   */
  static isConstraintLine(line) {
    return line.contains('constraint')
  }

}

export class Constraints {
  constructor(pkMap, uniqueMap) {
    /** @private */
    this.pkMap = pkMap;
    /** @private */
    this.uniqueMap = uniqueMap;
  }
  isPk(/** @type {string} */columnName) {
    return !!this.pkMap[columnName]
  }
  isUnique(/** @type {string} */columnName) {
    return !!this.uniqueMap[columnName]
  }

  static empty() {
    return new Constraints({}, {});
  }
}