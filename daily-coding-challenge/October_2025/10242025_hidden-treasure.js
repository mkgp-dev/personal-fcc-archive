/*
(October 24, 2025) Hidden Treasure
Given a 2D array representing a map of the ocean floor that includes a hidden treasure, and an array with the coordinates ([row, column]) for the next dive of your treasure search, return "Empty", "Found", or "Recovered" using the following rules:
- The given 2D array will contain exactly one unrecovered treasure, which will occupy multiple cells.
- Each cell in the 2D array will contain one of the following values:
  - "-": No treasure.
  - "O": A part of the treasure that has not been found.
  - "X": A part of the treasure that has already been found.
- If the dive location has no treasure, return "Empty".
- If the dive location finds treasure, but at least one other part of the treasure remains unfound, return "Found".
- If the dive location finds the last unfound part of the treasure, return "Recovered".
For example, given:
[
  [ "-", "X"],
  [ "-", "X"],
  [ "-", "O"]
]
And [2, 1] for the coordinates of the dive location, return "Recovered" because the dive found the last unfound part of the treasure.

Test case:
dive([[ "-", "X"], [ "-", "X"], [ "-", "O"]], [2, 1])
=> Recovered
dive([[ "-", "X"], [ "-", "X"], [ "-", "O"]], [2, 0])
=> Empty
dive([[ "-", "-", "-"], [ "X", "O", "X"], [ "-", "-", "-"]], [1, 2])
=> Found
*/

function dive(map, coordinates) {
  const [r, c] = coordinates;
  const cell = map[r][c];
  if (cell === '-') return 'Empty';

  let i = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] == 'O') i++;
      if (i > 1) break;
    }
  }

  if (cell === 'O') return i === 1 ? 'Recovered' : 'Found';
  return 'Found';
}
