/*
(November 07, 2025) Counting Cards
A standard deck of playing cards has 13 unique cards in each suit. Given an integer representing the number of cards to pick from the deck, return the number of unique combinations of cards you can pick.
- Order does not matter. Picking card A then card B is the same as picking card B then card A.
For example, given 52, return 1. There's only one combination of 52 cards to pick from a 52 card deck. And given 2, return 1326, There's 1326 card combinations you can end up with when picking 2 cards from the deck.

Test cases:
combinations(52)
=> 1
combinations(50)
=> 1326
combinations(10)
=> 15820024220
*/

function combinations(cards) {
  const _default = 52;
  
  let result = 1;
  for (let i = 1; i <= cards; i++) result *= (_default - i + 1) / i;

  return Math.round(result);
}
