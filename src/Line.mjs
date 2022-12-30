export class Line {
  constructor(value, lineNumber) {
    this.value = value;
    this.lowerCaseValue = value.toLowerCase();
    this.lineNumber = lineNumber;
  }

  /**
   * 行の中にある／＊ コメント ＊／を取得する
   * @param {*} line 
   * @returns コメント。ない場合は空文字
   */
  getComment() {
    if(this.value.indexOf('/*') == -1) {
      return '';
    }
    return this.value.split('/*')[1].split('*/')[0].trim();
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
}