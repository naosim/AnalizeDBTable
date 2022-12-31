export function assert(expr, message) {
  if(!Boolean(expr)) {
    throw new Error(message || 'unknown assertion error');
  }
}

export function assertEq(act, exp, message) {
  message = message || 'unknown assertion error';
  if(!Boolean(act == exp)) {
    throw new Error(`${message}: act=${act}, exp=${exp}`);
  }
}

export async function test(tests) {
  var isError = false;
  try {
    Object.keys(tests).forEach(testFileName => {
      Object.keys(tests[testFileName]).forEach(async k => {
        try {
          await tests[testFileName][k]()
          console.info(`OK ${k} (${testFileName})`)
        } catch (err) {
          isError = true;
          var errorText = `NG ${k} (${testFileName})`
          console.info(errorText)
          console.error(err)
        }
      })
    })
    
  } catch (err) {
    console.error(err)
    isError = true;
  }
  if(isError) {
    console.log('')
    throw new Error('テストにエラーがありました');
  }


}

/**
 * 
 * @param {string[]} files 
 * @returns { {"filename": {"testcase": function}} }
 */
export async function loadTests(files) {
  var result = {};
  for(var file of files) {
    result[file] = (await import(file)).default
  }
  return result;
}