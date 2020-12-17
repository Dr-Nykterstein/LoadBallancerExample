const sleep = (time) => new Promise((resolve => setTimeout(resolve, time)));

const factorial = (userInt) => {
  if(userInt===0) return '1';

  if(!userInt) return '';

  let i;
  let nextNumber;
  let caret;
  let result = userInt.toString().split('').reverse().map(Number)

  while(--userInt) {
    i = caret = 0;

    while((nextNumber = result[i++]) !== undefined || caret) {
      caret = (nextNumber || 0) * userInt + caret;
      result[i-1] = caret % 10;
      caret = parseInt(caret / 10);
    }
  }

  return result.reverse().join('');
}

module.exports = factorial;
