/*
(October 04, 2025) Space Week Day 1: Stellar Classification
October 4th marks the beginning of World Space Week. The next seven days will bring you astronomy-themed coding challenges.
For today's challenge, you are given the surface temperature of a star in Kelvin (K) and need to determine its stellar classification based on the following ranges:

- "O": 30,000 K or higher
- "B": 10,000 K - 29,999 K
- "A": 7,500 K - 9,999 K
- "F": 6,000 K - 7,499 K
- "G": 5,200 K - 5,999 K
- "K": 3,700 K - 5,199 K
- "M": 0 K - 3,699 K

Return the classification of the given star.
*/

function classification(temp) {
  if (temp <= 3699) return 'M';
  else if (temp <= 5199) return 'K';
  else if (temp <= 5999) return 'G';
  else if (temp <= 7499) return 'F';
  else if (temp <= 9999) return 'A';
  else if (temp <= 29999) return 'B';
  else return 'O';
}
