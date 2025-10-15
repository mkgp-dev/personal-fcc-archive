/*
(October 14, 2025) String Count
Given two strings, determine how many times the second string appears in the first.
- The pattern string can overlap in the first string. For example, "aaa" contains "aa" twice. The first two a's and the second two.

Test:
count('101010101010101010101', '101') => 10
count('mississippi', 'iss') => 2

Reference/s:
https://stackoverflow.com/questions/3172985/javascript-use-variable-in-string-match
*/

function count(text, pattern) {
  const p = new RegExp(`(?=(${pattern}))`, 'g');
  const l = text.match(p);
  
  if (l === null) return 0;
  return l.length;
}
