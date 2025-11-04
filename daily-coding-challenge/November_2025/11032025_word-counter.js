/*
(November 03, 2025) Word Counter
Given a sentence string, return the number of words that are in the sentence.
- Words are any sequence of non-space characters and are separated by a single space.

Test cases:
countWords("Complete the challenge in JavaScript and Python.")
=> 7
countWords("The missing semi-colon crashed the entire internet.")
=> 7

Reference/s:
https://regex101.com/
*/

function countWords(sentence) {
  return (sentence.match(/[A-Za-z-]+/g)).length;
}
