/*
(October 17, 2025) Credit Card Masker
Given a string of credit card numbers, return a masked version of it using the following constraints:
- The string will contain four sets of four digits (0-9), with all sets being separated by a single space, or a single hyphen (-).
- Replace all numbers, except the last four, with an asterisk (*).
- Leave the remaining characters unchanged.

For example, given "4012-8888-8888-1881" return "****-****-****-1881".

Test:
mask("4012-8888-8888-1881") => "****-****-****-1881"
mask("5105 1051 0510 5100") => "**** **** **** 5100"

Reference/s:
https://regex101.com/
*/

function mask(card) {
  let i = 0;
  return card.replace(/(\d{4})/g, (m) => {
    if (i < 3) { i++; return '****'; }
    return m;
  });
}
