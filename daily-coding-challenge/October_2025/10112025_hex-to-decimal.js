/*
(October 11, 2025) Hex to Decimal
Given a string representing a hexadecimal number (base 16), return its decimal (base 10) value as an integer.
Hexadecimal is a number system that uses 16 digits:
- 0-9 represent values 0 through 9.
- A-F represent values 10 through 15.

Test:
hexToDecimal("A") => 10
hexToDecimal("A3F") => 2623

Reference/s:
https://stackoverflow.com/questions/1337419/how-do-you-convert-numbers-between-different-bases-in-javascript
*/

function hexToDecimal(hex) {
  return parseInt(hex, 16);
}
