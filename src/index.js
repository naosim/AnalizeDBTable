// for node.js
import process from 'process';
import {AnalyzeDBTableService} from './AnalyzeDBTableService.mjs'
import {execAndEachLine, readFileSync} from './nodeJsWrapper.mjs'

// メイン処理
var service = new AnalyzeDBTableService(execAndEachLine, readFileSync);
service.analyzeDBTable(
  process.argv[2],
  (data) => console.log(JSON.stringify(data, null, '  '))
);
