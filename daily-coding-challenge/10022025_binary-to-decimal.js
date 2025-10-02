/*
(October 02, 2025) Binary to Decimal
Given a string representing a binary number, return its decimal equivalent as a number.

A binary number uses only the digits 0 and 1 to represent any number. To convert binary to decimal, multiply each digit by a power of 2 and add them together. Start by multiplying the rightmost digit by 2^0, the next digit to the left by 2^1, and so on. Once all digits have been multiplied by a power of 2, add the result together.

For example, the binary number 101 equals 5 in decimal because:
1 * 2^2 + 0 * 2^1 + 1 * 2^0 = 4 + 0 + 1 = 5

References:
https://stackoverflow.com/questions/7784620/javascript-number-split-into-individual-digits
https://flatcoding.com/tutorials/javascript/math-pow-in-javascript-how-to-raise-numbers-to-power/
*/

function toDecimal(binary) {
  // Convert number to string to identify its length
  const num_str = String(binary);
  const num = num_str.split('').reverse();

  // Multiply each number to the current exponent and sum them all
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    const num_int = Number(num[i]);
    let temp = num_int * (2 ** i);
    sum += temp;
  }

  return sum;
}
