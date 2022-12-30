import {Line} from './Line.mjs'

export class ConstraintLine {
  constructor(line) {
    this.line = line;
  }

  getArgs(keyword) {
    return this.line.value.split(keyword)[1].split('(')[1].split(')')[0].split(',').map(v => v.trim());
  }

  parse() {
    var line = this.line.value;
    if(!ConstraintLine.isConstraintLine(this.line)) {
      throw new Error('CONSTRAINTでない');
    }
    var pkMap = {};
    var uniqueMap = {};
    if(line.indexOf('PRIMARY KEY') != -1) {
      pkMap = getArgs(line, 'PRIMARY KEY').reduce((memo, v) => {memo[v] = v; return memo}, {});
      // pkMap = line.split('PRIMARY KEY')[1].split('(')[1].split(')')[0].split(',').map(v => v.trim()).reduce((memo, v) => {memo[v] = v; return memo}, {});
    } else if(line.indexOf('UNIQUE') != -1) {
      uniqueMap = getArgs(line, 'UNIQUE').reduce((memo, v) => {memo[v] = v; return memo}, {});
      // uniqueMap = line.split('UNIQUE')[1].split('(')[1].split(')')[0].split(',').map(v => v.trim()).reduce((memo, v) => {memo[v] = v; return memo}, {});
    } else {
      throw new Error('CONSTRAINT keyword not found:' + line);
    }
    return new Constraints(pkMap, uniqueMap);
  }

  static isConstraintLine(line) {
    return line.lowerCaseValue.indexOf('constraint') == 0
  }

}

export class Constraints {
  constructor(pkMap, uniqueMap) {
    this.pkMap = pkMap;
    this.uniqueMap = uniqueMap;
  }
  isPk(columnName) {
    return !!this.pkMap[columnName]
  }
  isUnique(columnName) {
    return !!this.uniqueMap[columnName]
  }

  static empty() {
    return new Constraints({}, {});
  }
}


/**
 * "hoge foo KEYWORD (arg1, arg2) hoge"からarg1, arg2を取得する
 */
function getArgs(line, keyword) {
  return line.split(keyword)[1].split('(')[1].split(')')[0].split(',').map(v => v.trim());
}