/*
(November 09, 2025) Word Search
Given a matrix (an array of arrays) of single letters and a word to find, return the start and end indices of the word in the matrix.
- The given matrix will be filled with all lowercase letters (a-z).
- The word to find will always be in the matrix exactly once.
- The word to find will always be in a straight line in one of these directions:
  - left to right
  - right to left
  - top to bottom
  - bottom to top
  
For example, given the matrix:
[
  ["a", "c", "t"],
  ["t", "a", "t"],
  ["c", "t", "c"]
]

And the word "cat", return:
[[0, 1], [2, 1]]

Where [0, 1] are the indices for the "c" (start of the word), and [2, 1] are the indices for the "t" (end of the word).

Test cases:
findWord([["a", "c", "t"], ["t", "a", "t"], ["c", "t", "c"]], "cat")
=> [[0, 1], [2, 1]]
findWord([["d", "o", "g"], ["o", "g", "d"], ["d", "g", "o"]], "dog")
=> [[0, 0], [0, 2]]
findWord([["h", "i", "s", "h"], ["i", "s", "f", "s"], ["f", "s", "i", "i"], ["s", "h", "i", "f"]], "fish")
=> [[3, 3], [0, 3]]
findWord([["f", "x", "o", "x"], ["o", "x", "o", "f"], ["f", "o", "f", "x"], ["f", "x", "x", "o"]], "fox")
=> [[1, 3], [1, 1]]
*/

function findWord(matrix, word) {
  const reverse = word.split('').reverse().join('');

  for (let row = 0; row < matrix.length; row++) {
    const str = matrix[row].join('');
    for (const w of [word, reverse]) {
      const idx = str.indexOf(w);
      if (idx !== -1) {
        if (w === word) return [[row, idx], [row, idx + word.length - 1]];
        return [[row, idx + word.length - 1], [row, idx]];
      }
    }
  }

  for (let col = 0; col < matrix[0].length; col++) {
    const str = matrix.map(row => row[col]).join('');
    for (const w of [word, reverse]) {
      const idx = str.indexOf(w);
      if (idx !== -1) {
        if (w === word) return [[idx, col], [idx + word.length - 1, col]];
        return [[idx + word.length - 1, col], [idx, col]];
      }
    }
  }
  
  return null;
}
