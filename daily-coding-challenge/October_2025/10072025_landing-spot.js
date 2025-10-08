/*
(October 07, 2025) Space Week Day 4: Landing Spot
In day four of Space Week, you are given a matrix of numbers (an array of arrays), representing potential landing spots for your rover. Find the safest landing spot based on the following rules:
- Each spot in the matrix will contain a number from 0-9, inclusive.
- Any 0 represents a potential landing spot.
- Any number other than 0 is too dangerous to land. The higher the number, the more dangerous.
- The safest spot is defined as the 0 cell whose surrounding cells (up to 4 neighbors, ignore diagonals) have the lowest total danger.
- Ignore out-of-bounds neighbors (corners and edges just have fewer neighbors).
- Return the indices of the safest landing spot. There will always only be one safest spot.

For instance, given:
[
  [1, 0],
  [2, 0]
]
Return [0, 1], the indices for the 0 in the first array.

Usage:
findLandingSpot([[1, 0], [2, 0]]) => [0, 1]
findLandingSpot([[1, 2, 1], [0, 0, 2], [3, 0, 0]]) => [2, 2]

References:
https://stackoverflow.com/questions/70456422/return-coordinates-x-y-from-an-array-of-numbers-in-javascript
https://stackoverflow.com/questions/652106/finding-neighbours-in-a-two-dimensional-array
*/

function findLandingSpot(matrix) {
  // global var
  let temp = Infinity;
  let data = [0, 0];

  // scan row and column
  // height = matrix.length
  // width = matrix[row].length
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      // check if row has 0
      if (matrix[row][col] === 0) {
        // find neighbours and add them
        let sum = 0;
        if (row > 0) sum += matrix[row - 1][col]; // up
        if (row < matrix.length - 1) sum += matrix[row + 1][col];
        if (col > 0) sum += matrix[row][col - 1];
        if (col < matrix[row].length - 1) sum += matrix[row][col + 1];
        // poor choice to do (well considering it works)
        // const sum = matrix[row].reduce((a, b) => a + b);

        // compare who's the least and store the data
        if (sum < temp) {
          temp = sum;
          data = [row, col];
        }
      }
    }
  }

  return data;
}
