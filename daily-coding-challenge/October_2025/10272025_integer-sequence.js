/*
(October 27, 2025) Integer Sequence
Given a positive integer, return a string with all of the integers from 1 up to, and including, the given number, in numerical order.
For example, given 5, return "12345".

Test case:
sequence(5) => 12345
sequence(10) => 12345678910
*/

function sequence(n) {
  const s = [];
  for (let i = 1; i <= n; i++) s.push(i);
  return s.join('');
}
