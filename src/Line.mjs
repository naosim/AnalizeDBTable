export class Line {
  constructor(
    /** @type {string}*/value, 
    /** @type {number}*/lineNumber
  ) {
    /** @type string */
    this.comment = Line.getComment(value);
    this.value = Line.excludeComment(value);
    this.lowerCaseValue = this.value.toLowerCase();
    /** @type number */
    this.lineNumber = lineNumber;
  }

  isSkipLine() {
    return this.value.length == 0 || this.value == '(' || this.value == ')'
  }

  isFirstLine() {
    return this.lineNumber == 0;
  }

  static createLine(value, lineNumber) {
    return new Line(value.trim().split('\t').join(' ').split(' ').filter(v => v.length > 0).join(' '), lineNumber)
  }

  contains(/** @type {string}*/keyword) {
    keyword = keyword.toLowerCase();
    return this.lowerCaseValue.indexOf(keyword) != -1;
  }

  static excludeComment(text) {
    if(text.indexOf('/*') == -1) {
      return text;
    }
    var before = text.split('/*')[0].trim();
    var after = text.split('*/')[1].trim();
    return [before, after].join(' ');
  }
  static getComment(text) {
    if(text.indexOf('/*') == -1) {
      return '';
    }
    return text.split('/*')[1].split('*/')[0].trim();
  }
}