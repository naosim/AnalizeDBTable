import {test, loadTests} from './testlib.mjs';

test(await loadTests([
  './testAnalyzeDBTableService.mjs',
  './testTableNameLine.mjs',
  './testColumnLine.mjs',
  './testConstraintLine.mjs',
]))
