import {exec} from 'child_process'
import fs from 'fs'

/**
 * ターミナルでコマンドを実行した結果を行単位のリストで返す
 * @param {string} command 
 * @param {(lines:string)=>void} cb 
 */
export function execAndEachLine(command, cb) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`stderr: ${stderr}`)
      return
    }
    var lines = stdout.trim().split('\n').map(v => v.trim()).filter(v => v.length > 0);
    cb(lines);
  });
}

/**
 * テキストファイルを開く
 * 
 * 引数はnodejsのfs.readFileSyncに従う
 * @param {string} path
 * @param {any} option 
 * @returns 
 */
export function readFileSync(path, option) {
  return fs.readFileSync(path, option).trim();
}