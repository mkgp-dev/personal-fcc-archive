/*
(November 05, 2025) Matrix Builder
Given two integers (a number of rows and a number of columns), return a matrix (an array of arrays) filled with zeros (0) of the given size.
For example, given 2 and 3, return:
[
  [0, 0, 0],
  [0, 0, 0]
]

Test cases:
buildMatrix(4, 3)
=> [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
buildMatrix(9, 1)
=> [[0], [0], [0], [0], [0], [0], [0], [0], [0]]
*/

function buildMatrix(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}
