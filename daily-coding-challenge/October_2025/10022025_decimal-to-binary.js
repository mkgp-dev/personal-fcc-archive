/*
(October 02, 2025) Decimal to Binary
Given a non-negative integer, return its binary representation as a string.

A binary number uses only the digits 0 and 1 to represent any number. To convert a decimal number to binary, repeatedly divide the number by 2 and record the remainder. Repeat until the number is zero. Read the remainders last recorded to first. For example, to convert 12 to binary:
12 ÷ 2 = 6 remainder 0
6 ÷ 2 = 3 remainder 0
3 ÷ 2 = 1 remainder 1
1 ÷ 2 = 0 remainder 1

12 in binary is 1100

References:
https://stackoverflow.com/questions/47687344/checking-remainder-in-javascript
https://stackoverflow.com/questions/53288027/how-to-add-to-a-string-in-for-loop-in-javascript
https://stackoverflow.com/questions/958908/how-do-you-reverse-a-string-in-place/16776621#16776621
*/

function toBinary(decimal) {
  let num = decimal;
  let string = '';

  while (num > 0) {
    // Check for remainders
    if (num % 2 === 0) {
      string += '0';
    } else {
      string += '1';
    }

    // Divide itself by 2
    num /= 2;

    // Remove decimals
    num = Math.trunc(num);
  }

  // Reverse string (safe as we are using simple ASCII characs)
  const result = string.split('').reverse().join('');
  return result;
}
